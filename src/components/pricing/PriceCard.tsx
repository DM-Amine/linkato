"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CheckCircle, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Feature = {
  text: string;
  included: boolean;
};

type PriceCardProps = {
  title: string;
  price: string;
  description: string;
  features: Feature[];
  cta?: string;
  highlighted?: boolean;
};

export default function PriceCard({
  title,
  price,
  description,
  features,
  cta = "Get Started",
  highlighted = false,
}: PriceCardProps) {
  return (
    <div className="relative mt-12 flex flex-col items-center">
      {highlighted && (
        <Badge className="mb-[-0.5rem] z-10 -mt-10 bg-primary dark:bg-d-primary-light  text-white rounded-full px-3 py-1 text-xs shadow-md">
          Most Popular
        </Badge>
      )}

      <Card
        className={cn(
          "w-full max-w-sm flex flex-col border rounded-3xl overflow-hidden transition-all duration-300 bg-background",
          highlighted
            ? "border-primary dark:border-d-primary-light  shadow-lg shadow-primary/40 dark:shadow-d-primary/40 ring-1 ring-primary"
            : "border-border"
        )}
      >
        <CardHeader
          className={cn(
            "px-6 border-b shadow-md bg-neutral-100 dark:bg-neutral-900 pt-3 [.border-b]:pb-3  text-center",
            highlighted
              ? "border-primary dark:border-d-primary-light   ring-1 ring-d-primary"
              : "border-border "
          )}
        >
          <CardTitle className="text-lg font-semibold text-foreground">
            #{title}
          </CardTitle>
          <div className=" text-3xl font-bold tracking-tight text-foreground">
            {price}
          </div>
          <CardDescription className=" text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-3 py-4">
          <ul className="space-y-3">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                {feature.included ? (
                  <CheckCircle
                    className="w-4 h-4 mt-0.5 text-success dark:text-success-l "
                    strokeWidth={2}
                  />
                ) : (
                  <Minus
                    className="w-4 h-4 mt-0.5 text-muted-foreground"
                    strokeWidth={1.5}
                  />
                )}
                <span
                  className={cn(
                    "leading-tight",
                    feature.included
                      ? "text-foreground"
                      : "text-muted-foreground line-through"
                  )}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="px-3 pt-2 pb-3">
          <Button
            className={cn(
              "w-full text-sm font-medium rounded-lg h-8 transition-all duration-200",
              highlighted
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-neutral-50"
            )}
            variant={highlighted ? "default" : "outline"}
          >
            {cta}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
