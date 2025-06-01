"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
const Footer = () => {
    const pathname = usePathname();
    
    // Check if the current pathname starts with '/dashboard' or '/adminPanel'
    const isDynamicPublicPage = /^\/[^/]+$/.test(pathname);
    const hideFooter = pathname.startsWith("/dashboard") || pathname.startsWith("/adminPanel") || isDynamicPublicPage;
    
    if (hideFooter) {
      return null; // Return null to hide the footer
    }
    
    return (
        <footer className="bg-neutral-200 dark:bg-neutral-900 text-neutral-800 border-t border-neutral-400 dark:border-neutral-800 dark:text-neutral-200 pt-8">
  <div className="container mx-auto px-4">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    <div className="bg-neutral-100 dark:bg-neutral-950 px-3 py-2 rounded-xl border border-white dark:border-neutral-800">
      <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Dokweel</h1>
      <p className="text-sm leading-relaxed">
        The modern blogging platform powered by AI. Create, share, and grow your business content smarter.
      </p>
    </div>

    <div>
      <h3 className="text-base font-semibold mb-2">Product</h3>
      <ul className="space-y-1 text-sm">
        <li><Link href="#" className="hover:text-primary/90 transition-colors">Features</Link></li>
        <li><Link href="#" className="hover:text-primary/90 transition-colors">Pricing</Link></li>
        <li><Link href="#" className="hover:text-primary/90 transition-colors">Blog</Link></li>
        <li><Link href="waitlist" className="hover:text-primary/90 transition-colors">waitlist</Link></li>
      </ul>
    </div>

    <div>
      <h3 className="text-base font-semibold mb-2">Company</h3>
      <ul className="space-y-1 text-sm">
        <li><Link href="#" className="hover:text-primary/90 transition-colors">About</Link></li>
        <li><Link href="#" className="hover:text-primary/90 transition-colors">Careers</Link></li>
        <li><Link href="#" className="hover:text-primary/90 transition-colors">Roadmap</Link></li>
        <li><Link href="#" className="hover:text-primary/90 transition-colors">Contact</Link></li>
      </ul>
    </div>

    <div>
      <h3 className="text-base font-semibold mb-2">Follow Us</h3>
      <div className="flex space-x-4 text-sm">
        <Link href="#" className="hover:text-primary/90 transition-colors">Twitter</Link>
        <Link href="#" className="hover:text-primary/90 transition-colors">LinkedIn</Link>
        <Link href="#" className="hover:text-primary/90 transition-colors">GitHub</Link>
      </div>
    </div>
  </div>

  <div className="mt-12 border-t border-neutral-400 dark:border-neutral-800 py-3 flex flex-col md:flex-row items-center justify-between text-sm space-y-2 md:space-y-0">
    <p>© {new Date().getFullYear()} Dokweel. All rights reserved.</p>
    <div className="flex flex-wrap items-center gap-4">
      <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
      <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
      
    </div>
    <p>
      Built with <span className="text-red-500">♥</span> by{" "}
      <strong className="font-semibold">@Damine.dev</strong>
    </p>
  </div>
</div>

  <script type="application/ld+json" dangerouslySetInnerHTML={{
  __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dokweel",
    "url": "https://dokweel.com",
    "logo": "https://dokweel.com/logo.png",
    "sameAs": [
      "https://twitter.com/yourHandle",
      "https://linkedin.com/company/yourCompany",
      "https://github.com/damine-dev"
    ]
  })
}} />

</footer>

    );
};

export default Footer;
