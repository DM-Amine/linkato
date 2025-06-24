
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
} from "lucide-react";

export default function CTA() {
    return(
      <Link href="/auth/signup">
         <Button
                  variant="ghost"
                  className="w-30 h-8.5 group relative inline-flex items-center justify-center gap-1.5 py-4 rounded-xl text-sm font-semibold 
               text-neutral-700 bg-primary shadow-lg shadow-primary/70 hover:shadow-none ring-2 ring-primary hover:ring-primary-light
               
               hover:bg-primary 
              
               active:scale-[0.97] 
               transition-all duration-300 ease-in-out 
               focus:outline-none focus:ring-2 focus:ring-primary-light 
               dark:bg-d-primary 
               dark:hover:bg-d-primary 
               dark:focus:ring-d-primary-light"
                >
                  Get Started
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                </Link>
    )
}