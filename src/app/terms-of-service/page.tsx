// app/terms-of-service/page.tsx

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - Lunitea",
  description:
    "Understand the terms for using Lunitea and purchasing the boilerplate.",
};

export default function TermsOfServicePage() {
  return (
    <section className="w-full flex justify-center items-center  mx-1  text-sm">
      <div className="max-w-4xl  bg-neutral-100 dark:bg-neutral-900 my-16 border px-4 py-8 border-neutral-500 rounded-2xl">
      <h1 className=" text-2xl font-bold mb-6 underline">Terms of Service:</h1>

<p className="mb-4">Effective Date: [Today&apos;s Date]</p>

<p className="mb-4">
  These Terms govern your use of Lunitea and any purchases made through
  our platform.
</p>

<h2 className="text-lg font-semibold mt-8 mb-4">Product License</h2>
<p className="mb-4">
  By purchasing the Lunitea Boilerplate, you receive a single license to
  use the codebase for personal or commercial projects.
</p>
<ul className="list-disc list-inside space-y-2 mb-6">
  <li>Do not resell, redistribute, or sublicense the product.</li>
  <li>Do not claim ownership of the original code.</li>
  <li>Do not publicly share the files.</li>
</ul>

<h2 className="text-lg font-semibold mt-8 mb-4">Refunds</h2>
<p className="mb-4">
  Refunds are available within 7 days of purchase, according to our{" "}
  <Link href="/refund-policy" className="underline">
    Refund Policy
  </Link>
  .
</p>

<h2 className="text-lg font-semibold mt-8 mb-4">
  Limitation of Liability
</h2>
<p className="mb-4">
  We are not responsible for any damages, losses, or issues arising from
  the use of Lunitea.
</p>

<h2 className="text-lg font-semibold mt-8 mb-4">
  Changes to These Terms
</h2>
<p className="mb-4">
  We may update these terms. Updates will be posted on this page.
</p>

<h2 className="text-lg font-semibold mt-8 mb-4">Contact</h2>
<p>
  For questions regarding these Terms, contact us at{" "}
  <span className="underline">[your@email.com]</span>.
</p>
      </div>
    </section>
  );
}
