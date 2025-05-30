'use client'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '../ui/label'
import { MailIcon } from 'lucide-react'


declare global {
  interface Navigator {
    brave?: {
      isBrave(): Promise<boolean>;
    };
  }
} 

const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email'),
})

type WaitlistFormData = z.infer<typeof waitlistSchema>

export function WaitlistForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  })

const storeUtmParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');

  if (utmSource || utmMedium || utmCampaign) {
    localStorage.setItem('utm_source', utmSource || '');
    localStorage.setItem('utm_medium', utmMedium || '');
    localStorage.setItem('utm_campaign', utmCampaign || '');
  }
};

// Run the function when the page loads
useEffect(() => {
  storeUtmParams();
}, []);

  const detectBrowserInfo = async () => {
    const userAgent = navigator.userAgent;
    const isBrave = (navigator.brave && (await navigator.brave.isBrave())) || false;
    const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);
  
    let browserName = 'Unknown';
    let osName = 'Unknown';
  
    if (isBrave) {
      browserName = 'Brave';
    } else if (/OPR\//.test(userAgent) || /Opera/.test(userAgent)) {
      browserName = 'Opera';
    } else if (/Chrome/.test(userAgent) && !/Edge/.test(userAgent) && !/Edg/.test(userAgent)) {
      browserName = 'Chrome';
    } else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
      browserName = 'Safari';
    } else if (/Firefox/.test(userAgent)) {
      browserName = 'Firefox';
    } else if (/Edg/.test(userAgent)) {
      browserName = 'Edge';
    }
  
    if (/Android/.test(userAgent)) {
      osName = 'Android';
    } else if (/iPhone|iPad|iPod/.test(userAgent)) {
      osName = 'iOS';
    } else if (/Windows NT/.test(userAgent)) {
      osName = 'Windows';
    } else if (/Macintosh/.test(userAgent)) {
      osName = 'MacOS';
    } else if (/Linux/.test(userAgent)) {
      osName = 'Linux';
    }
  
    return { browserName, isBrave, osName, isMobile };
  };


  
  const router = useRouter()
  

const onSubmit = async (data: WaitlistFormData) => {
  try {
    const utmSource = localStorage.getItem('utm_source') || '';
    const utmMedium = localStorage.getItem('utm_medium') || '';
    const utmCampaign = localStorage.getItem('utm_campaign') || '';
    
    const { browserName, osName, isMobile } = await detectBrowserInfo();
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        browser: browserName,
        os: osName,
        isMobile,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      }),
    });

    const result = await res.json();

    if (res.status === 409) {
      toast.warning("You're already on the waitlist!");
      return;
    }

    if (!res.ok) {
      throw new Error(result.error || 'Something went wrong');
    }

    toast.success("You're on the waitlist!");
    reset();
    router.push('/thank-you'); // 👈 Redirect here
  } catch (error: unknown) {
    console.error('Error during form submission:', error);

    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Failed to join waitlist.');
    }
  }
}

  
  
  
  


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-4 py-3 shadow-sm dark:shadow-md space-y-4 transition-colors"
      aria-label="Join Waitlist"
    >
      <div className="space-y-2 text-center">
        <Label
          htmlFor="email"
          className="block w-full text-lg mb-3 font-medium text-neutral-800 dark:text-neutral-200"
        >
          🔓 Get Early Access
        </Label>
        <div className="relative">
          <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 dark:text-neutral-600 pointer-events-none" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register('email')}
            className="pl-10 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition rounded-md"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-error dark:text-error-light">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-primary hover:bg-primary-light text-white text-sm font-semibold tracking-wide py-2 transition-all duration-200"
      >
        {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
      </Button>
    </form>
  )
}