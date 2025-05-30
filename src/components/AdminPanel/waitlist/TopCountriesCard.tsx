import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Globe, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopCountriesCard({
  countries,
}: {
  countries: { country: string; count: number; percentage: number }[];
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="w-full my-3 py-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-500 shadow-none">
      <CardHeader className="px-3 flex items-center justify-between">
        <CardTitle className="text-base text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
          <Globe size={18} />
          Top Countries
        </CardTitle>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-neutral-600 dark:text-neutral-300 border h-6 w-6 border-neutral-500 bg-neutral-300 dark:bg-neutral-700 hover:text-primary dark:hover:text-d-primary hover:border-neutral-400/70 dark:hover:border-neutral-600  transition"
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Button>
      </CardHeader>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100 mt-5" : "max-h-0 opacity-0"}`}
      >
        <CardContent className="px-2 sm:px-3 space-y-1.5">
          {countries.map((item) => (
            <div
              key={item.country}
              className="relative w-full rounded-md overflow-hidden bg-neutral-200 dark:bg-neutral-800"
            >
              <div
                className="absolute top-0 left-0 h-full bg-primary opacity-30 dark:opacity-40"
                style={{ width: `${item.percentage}%` }}
              />
              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center px-3 py-1.5 text-sm gap-1 sm:gap-4">
                <span className="font-medium text-neutral-800 dark:text-neutral-100">
                  {item.country}
                </span>
                <div className="flex items-center text-xs gap-2 text-neutral-600 dark:text-neutral-300">
                  <span>{item.count} users</span>
                  <span className="font-semibold text-primary dark:text-primary-light">
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </div>
    </Card>
  );
}

