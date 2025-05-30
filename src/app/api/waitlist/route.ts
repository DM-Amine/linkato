// ⚠️ important: only shows real user's data when the project is deployed!

import { detect } from 'detect-browser';
import { NextRequest, NextResponse } from 'next/server';
import Waitlist from '@/models/waitlist';
import connectDB from '@/lib/mongodb';

type LocationData = {
  country: string;
  city: string;
};

const getClientIP = (req: NextRequest): string => {
  const xff = req.headers.get('x-forwarded-for');
  const cf = req.headers.get('cf-connecting-ip');
  const localFallback = process.env.DEV_FAKE_IP || '8.8.8.8';
  return cf || xff?.split(',')[0]?.trim() || localFallback;
};

const parseUserAgent = (ua: string) => {
  const lowerUA = ua.toLowerCase();

  let browser = 'Other';
  let os = 'Other';
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(ua);

  // First: handle custom cases manually
  if (lowerUA.includes('brave')) {
    browser = 'Brave';
  } else {
    // Then fallback to detect-browser
    const browserData = detect(ua);
    if (browserData?.name) {
      browser = browserData.name.charAt(0).toUpperCase() + browserData.name.slice(1);
    }
    if (browserData?.os) {
      os = browserData.os;
    }
  }

  // Fix Edge manual override if needed
  if (lowerUA.includes('edge') && !lowerUA.includes('edg')) {
    browser = 'Microsoft Edge';
  }

  // If OS still not detected from browserData
  if (os === 'Other') {
    if (/Windows NT/.test(ua)) {
      os = 'Windows';
    } else if (/Macintosh/.test(ua)) {
      os = 'MacOS';
    } else if (/Linux/.test(ua)) {
      os = 'Linux';
    } else if (/Android/.test(ua)) {
      os = 'Android';
    } else if (/iPhone|iPad|iPod/.test(ua)) {
      os = 'iOS';
    }
  }

  return { isMobile, browser, os };
};


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, browser: clientBrowser, os: clientOS ,isMobile: clientIsMobile, utm_source, utm_medium, utm_campaign   } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await Waitlist.findOne({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json({ error: 'This email is already on the waitlist.' }, { status: 409 });
    }

    const ip = getClientIP(req);
    const userAgentRaw = req.headers.get('user-agent') || 'Unknown';
    
    const languageRaw = req.headers.get('accept-language')?.split(',')[0] || 'Unknown';
const language = languageRaw.split(';')[0];

   
 

    // Log the raw user agent for debugging
    console.log('User-Agent:', userAgentRaw);

    // Use the browser from the frontend if available, otherwise parse the user agent
    const { isMobile, browser, os } = clientBrowser
    ? { browser: clientBrowser, isMobile: clientIsMobile ?? false, os: clientOS || 'Unknown' }
    : parseUserAgent(userAgentRaw);



    let locationData: LocationData = { country: 'Unknown', city: 'Unknown' };

    try {
      const geoRes = await fetch(`https://ipwho.is/${ip}`);
      if (geoRes.ok) {
        const geo = await geoRes.json();
        if (geo.success) {
          locationData = {
            country: geo.country || 'Unknown',
            city: geo.city || 'Unknown',
          };
        }
      }
    } catch (geoError) {
      console.error('Geo Lookup Failed:', geoError);
    }

    const waitlist = await Waitlist.create({
      email: normalizedEmail,
      location: locationData,
      userAgent: userAgentRaw,
      language,
      isMobile,
      browser,
      os,
      utm: {
        source: utm_source,
        medium: utm_medium,
        campaign: utm_campaign,
      },
    });
    

    return NextResponse.json({ success: true, waitlist });
  } catch (error) {
    console.error('Waitlist POST Error:', error);
    return NextResponse.json({ error: 'Server error. Please try again later.' }, { status: 500 });
  }
}


  

export async function GET() {
  try {
    await connectDB();

    const allWaitlist = await Waitlist.find().sort({ createdAt: -1 });
    const totalCount = allWaitlist.length;

    const flattenedWaitlist = allWaitlist.map((entry) => {
      const plain = entry.toObject();
      return {
        ...plain,
        utmSource: plain.utm?.source || null,
        utmMedium: plain.utm?.medium || null,
        utmCampaign: plain.utm?.campaign || null,
      };
    });

    const countryStats = await Waitlist.aggregate([
      {
        $group: {
          _id: "$location.country",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          country: "$_id",
          count: 1,
          percentage: {
            $multiply: [{ $divide: ["$count", totalCount] }, 100],
          },
        },
      },
      { $sort: { count: -1 } },
    ]);

    return NextResponse.json({
      success: true,
      waitlist: flattenedWaitlist,
      countries: countryStats,
    });
  } catch (error) {
    console.error("Error fetching waitlist:", error);
    return NextResponse.json(
      { error: "Failed to fetch waitlist data" },
      { status: 500 }
    );
  }
}