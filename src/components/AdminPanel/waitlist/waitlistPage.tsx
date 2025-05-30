"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Eye, EyeOff, Search } from "lucide-react";
import WaitlistTimeChart from "@/components/AdminPanel/waitlist/WaitlistTimeChart";
import { WaitlistTable } from "@/components/AdminPanel/waitlist/waitlistTable";
import { TopCountriesCard } from "@/components/AdminPanel/waitlist/TopCountriesCard";
import { TopInsightsTabsCard } from "@/components/AdminPanel/waitlist/TopInsightsTabsCard ";

export type WaitlistEntry = {
  name?: string;
  email?: string;
  browser?: string;
  os?: string;
  isMobile?: boolean;
  language?: string;
  location?: {
    country?: string;
    city?: string;
  };
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;

  createdAt: string;
  [key: string]: unknown;
};

const WaitlistPage = () => {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [countries, setCountries] = useState<
    { country: string; count: number; percentage: number }[]
  >([]);
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [loading, setLoading] = useState(true);

  const [showInsights, setShowInsights] = useState(true);
  // const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        const response = await fetch("/api/waitlist");
        const data = await response.json();

        if (data.success) {
          setWaitlist(Array.isArray(data.waitlist) ? data.waitlist : []);
          setCountries(Array.isArray(data.countries) ? data.countries : []);
        } else {
          toast.error("Failed to load waitlist data.");
        }
      } catch {
        toast.error("Error fetching waitlist data.");
        setWaitlist([]);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWaitlist();
  }, []);
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    const pathname = window.location.pathname; // ensures exact current path
    router.replace(`${pathname}?${params.toString()}`);
  };

  const groupAndCount = (
    key: keyof WaitlistEntry,
    transform?: (val: unknown) => string
  ) => {
    const counts: Record<string, number> = {};

    waitlist.forEach((item) => {
      let value = item[key];
      if (transform) value = transform(value);
      if (!value) value = "Unknown";
      const keyStr = String(value);
      counts[keyStr] = (counts[keyStr] || 0) + 1;
    });

    const total = waitlist.length;
    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: (count / total) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  const browsers = groupAndCount("browser");
  const devices = groupAndCount("isMobile", (val) =>
    val ? "Mobile" : "Desktop"
  );
  const os = groupAndCount("os");
  const languages = groupAndCount("language");

  const filteredWaitlist = waitlist.filter((entry) => {
    const query = searchQuery.toLowerCase();

    return (
      entry.name?.toLowerCase().includes(query) ||
      entry.email?.toLowerCase().includes(query) ||
      entry.browser?.toLowerCase().includes(query) ||
      entry.os?.toLowerCase().includes(query) ||
      (entry.isMobile ? "mobile" : "desktop").includes(query) ||
      entry.language?.toLowerCase().includes(query) ||
      entry.location?.country?.toLowerCase().includes(query) ||
      entry.location?.city?.toLowerCase().includes(query) ||
      entry.utmSource?.toLowerCase().includes(query) ||
      entry.utmMedium?.toLowerCase().includes(query) ||
      entry.utmCampaign?.toLowerCase().includes(query)
    );
  });
  console.log("Search Query:", searchQuery);
  console.log(
    "UTM Sources:",
    waitlist.map((w) => w.utmSource)
  );

  return (
    <div className="min-h-screen px-2  m:px-6 sm:py-4   py-3">
      <div className="max-full mx-auto">
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold text-primary mb-4">
            Waitlist Overview
          </h1>
          <Button
            variant="default"
            size="default"
            className="!px-1 w-fit py-1 mt-2 mr-1 border border-primary hover:bg-primary text-neutral-200 text-xs font-medium rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            onClick={() => setShowInsights((prev) => !prev)}
          >
            {showInsights ? <EyeOff size={16} /> : <Eye size={16} />}
            {showInsights ? "Hide Insights" : "Show Insights"}
          </Button>
        </div>
        {loading ? (
          <p className="text-center text-neutral-500 dark:text-neutral-400 text-sm">
            Loading waitlist...
          </p>
        ) : (
          <div className="space-y-4 rounded-lg  py-3">
            {waitlist.length === 0 ? (
              <p className="text-center text-neutral-500 dark:text-neutral-400 text-sm">
                No one is on the waitlist yet.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-md">
                <div className="flex mb-4">
                  <div className="flex items-center gap-2 border text-neutral-800 dark:text-neutral-200 border-neutral-500 px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 text-sm">
                    <Users size={16} />
                    <h2 className="font-medium">
                      Tota users:&nbsp;
                      <span className="text-primary dark:text-primary-light">
                        {filteredWaitlist.length} waiting users
                      </span>
                    </h2>
                  </div>
                </div>

                {/* waitlist table */}
                <div className="users-data-table">
                  <div className="mb-4  relative full md:w-64">
                    <Search
                      size={18}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400"
                    />
                    <Input
                      type="text"
                      placeholder="Search user by name, email, location, device, or UTM..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="pl-8 text-sm w-full h-8 border border-neutral-400 dark:border-neutral-600 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  {/* <p className="text-xs mb-2 font-semibold text-neutral-800 dark:text-neutral-200">
                    <span className="text-sm font-bold underline">
                      utm example:{" "}
                    </span>
                    <strong>{window.location.origin}</strong>
                    /?utm_source=<strong>instagram</strong>&utm_medium=
                    <strong>social</strong>&utm_campaign=
                    <strong>spring_sale</strong>
                  </p> */}
                  <div>
                  <div className="text-xs   w-fit mb-4 font-semibold t text-info bg-info/20 border border-info px-1 py-0.5 rounded-md ">
                    <span className="  text-sm"><span className="text-neutral-700 dark:text-neutral-300 ">UTM Example:</span></span> &ldquo;<span>{window.location.origin}/?utm_source=<strong>instagram</strong>&utm_medium=
                    <strong>social</strong>&utm_campaign=
                    <strong>launch</strong>&ldquo;</span>
                  </div>
                </div>
                  <WaitlistTable waitlist={filteredWaitlist} />
                </div>
                

                {/* Conditionally render Insights */}
                {showInsights && (
                  <div className="insights space-y-3">
                    {/* insights */}
                    <h1 className="text-lg font-semibold text-primary my-5">
                      Waitlist insights:
                    </h1>
                    <TopInsightsTabsCard
                      browsers={browsers}
                      devices={devices}
                      os={os}
                      languages={languages}
                    />
                    <TopCountriesCard countries={countries} />
                    <WaitlistTimeChart waitlist={waitlist} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistPage;
