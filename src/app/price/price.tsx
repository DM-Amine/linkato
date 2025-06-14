"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PriceCard from "@/components/pricing/PriceCard";
import { cn } from "@/lib/utils";



export default function Price() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const plans = [
    {
      title: "Personal",
      price: "Free",
      description: "Perfect for personal use and early testing.",
      highlighted: false,
      features: [
        { text: "one pages", included: true },
        { text: "5 links", included: true },
        { text: "all popular social media", included: true },
        { text: "No watermark", included: true },
        { text: "page editor", included: false },
        { text: "link custimazation", included: false },
        { text: "customers subscribe", included: false },
        { text: "form", included: false },
        { text: "premium themes", included: false },
        { text: "analytics", included: false },
      
      ],
    },
    {
      title: "Business",
      price: billingCycle === "yearly" ? "$96/year" : "$12/month",
      description:
        billingCycle === "yearly"
          ? "Best for startups – Save 33% with yearly billing."
          : "Best for startups and growing teams.",
      highlighted: false,
      features: [
        { text: "unlimited pages", included: true },
        { text: "unlimited links", included: true },
        { text: "all popular social media", included: true },
        { text: "No watermark", included: true },
        { text: "page editor", included: true },
        { text: "link custimazation", included: true },
         { text: "customers subscribe", included: true },
        { text: "form", included: true },
        { text: "premium themes", included: true },
        { text: "analytics", included: true },
      ],
    },
    // {
    //   title: "Business",
    //   price: billingCycle === "yearly" ? "$240/year" : "$25/month",
    //   description:
    //     billingCycle === "yearly"
    //       ? "For teams managing multiple blogs – Save 20% yearly."
    //       : "For businesses managing multiple projects and teams.",
    //   highlighted: false,
    //   features: [
    //     { text: "Multiple blog projects", included: true },
    //     { text: "Team collaboration", included: true },
    //     { text: "AI-powered content tools", included: true },
    //   ],
    // },
  ];

  return (
    <div className="py-16 px-4 md:px-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">
        Simple, transparent pricing
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Choose a plan that fits your team and goals.
      </p>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center mb-10">
        <div className="relative inline-flex border bg-neutral-100 dark:bg-neutral-900 rounded-full py-2 w-fit overflow-hidden">
          {/* Sliding background */}
          <div
            className={cn(
              "absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-primary dark:bg-d-primary-light transition-transform duration-300",
              billingCycle === "yearly" && "translate-x-full"
            )}
          />
          {/* Buttons */}
          <div className="relative z-10 flex w-full gap-1 px-1">
            <Button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "rounded-full px-5 py-1 text-sm transition-colors ring-none border-ring-none",
                billingCycle === "monthly"
                  ? "text-white"
                  : "text-foreground hover:bg-transparent"
              )}
              variant="ghost"
            >
              Monthly
            </Button>
            <Button
              onClick={() => setBillingCycle("yearly")}
              className={cn(
                "rounded-full px-5 py-1 text-sm transition-colors ring-none border-ring-none",
                billingCycle === "yearly"
                  ? "text-white"
                  : "text-foreground hover:bg-transparent"
              )}
              variant="ghost"
            >
              Yearly
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <PriceCard key={i} {...plan} />
        ))}
      </div>
    </div>
  );
}
