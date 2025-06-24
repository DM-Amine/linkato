// app/privacy-policy/page.tsx

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Lunitea",
  description: "Learn how Lunitea handles and protects your data.",
}

export default function PrivacyPolicyPage() {
  return (
    <section className="w-full flex justify-center items-center  mx-1  text-sm">
      <div className="max-w-4xl  bg-neutral-100 dark:bg-neutral-900 my-16 border px-4 py-8 border-neutral-500 rounded-2xl">
        
         <h1 className="text-2xl font-bold mb-6 underline ">Privacy Policy:</h1>
  
    <p className="mb-4">Effective Date: [Today&apos;s Date]</p>
  
    <p className="mb-4">
      At Lunitea, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
    </p>
  
    <h2 className="text-lg font-semibold mt-8 mb-4">Information We Collect</h2>
    <ul className="list-disc list-inside space-y-2 mb-6">
      <li>Email address (for order confirmation and support)</li>
      <li>Payment information (securely handled by LemonSqueezy)</li>
      <li>Analytics data (to improve our services)</li>
    </ul>
  
    <h2 className="text-lg font-semibold mt-8 mb-4">How We Use Your Information</h2>
    <ul className="list-disc list-inside space-y-2 mb-6">
      <li>To deliver your purchase</li>
      <li>To provide customer support</li>
      <li>To send important updates</li>
    </ul>
  
    <h2 className="text-lg font-semibold mt-8 mb-4">Third-Party Services</h2>
    <p className="mb-4">
      We use LemonSqueezy to securely process payments. We may also use analytics tools to better understand site usage.
    </p>
  
    <h2 className="text-lg font-semibold mt-8 mb-4">Data Protection</h2>
    <p className="mb-4">
      We take reasonable steps to protect your personal information, but no online transmission is 100% secure.
    </p>
  
    <h2 className="text-lg font-semibold mt-8 mb-4">Your Rights</h2>
    <p className="mb-4">
      You can contact us at [your@email.com] to request deletion of your data or ask any privacy-related questions.
    </p>
  
    <h2 className="text-lg font-semibold mt-8 mb-4">Contact</h2>
    <p>
      For privacy inquiries, email us at <span className="underline">[your@email.com]</span>.
    </p>
    </div>
  </section>
  
  )
}
