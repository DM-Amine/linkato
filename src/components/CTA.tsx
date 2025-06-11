
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
} from "lucide-react";

export default function CTA() {
    return(
         <Button
                  variant="ghost"
                  className="w-30 h-8.5 group relative inline-flex items-center justify-center gap-1.5 py-4 rounded-xl text-sm font-semibold 
               text-neutral-700 bg-primary 
               
               hover:bg-primary 
              
               active:scale-[0.97] 
               transition-all duration-300 ease-in-out 
               focus:outline-none focus:ring-2 focus:ring-primary-light 
               dark:bg-d-primary 
               dark:hover:bg-d-primary 
               dark:focus:ring-d-primary-light"
                >
                  <span>Get Started</span>
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
    )
}