
import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/ui/textReveal";
import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
} from "@/components/ui/terminal";

export default function QuickStart() {
    return (
<section>
  <div className="relative border-y border-primary flex flex-col sm:flex-row w-full items-center justify-between px-4 sm:px-8 py-12 sm:py-24 gap-10 bg-neutral-100 dark:bg-black">

    {/* Grid background */}
    <div
      className={cn(
        "absolute inset-0",
        "[background-size:40px_40px]",
        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
      )}
    />

    {/* Radial mask */}
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-neutral-200 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,red)] dark:bg-black"></div>

    {/* TextReveal */}
    <TextReveal className="text-neutral-700 max-w-xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-4 sm:px-0 text-center sm:text-left">
      
        All you need is a couple of minutes to start building your
        application, saving months of headaches 💥
     
  
        You&apos;ll get a detailed README fileas an easy-to-follow
        guide — and don&apos;t worry,Luniteais built to support all
        levels of developers❤️
    
    </TextReveal>

    {/* Terminal */}
    <div className="flex flex-col items-center justify-center w-full sm:w-auto px-4 sm:px-0">
      <Terminal className="bg-neutral-100 dark:bg-neutral-900 shadow-xl w-full max-w-md">
        <TypingAnimation>&gt; run: npm install</TypingAnimation>
        <AnimatedSpan delay={1500} className="text-green-500">
          <span>✔ Dependencies installed.</span>
        </AnimatedSpan>
        <AnimatedSpan delay={2000} className="text-green-500">
          <span>✔ Environment variables set up.</span>
        </AnimatedSpan>
        <AnimatedSpan delay={2500} className="text-green-500">
          <span>✔ MongoDB secrets configured.</span>
        </AnimatedSpan>
        <AnimatedSpan delay={3000} className="text-green-500">
          <span>✔ Google secrets configured.</span>
        </AnimatedSpan>
        <AnimatedSpan delay={3500} className="text-green-500">
          <span>✔ Branding colors added to &apos;tailwind.config.ts&apos;</span>
        </AnimatedSpan>
        <AnimatedSpan delay={4000} className="text-green-500">
          <span>✔ Start building...</span>
        </AnimatedSpan>
        <AnimatedSpan delay={4500} className="text-blue-500">
          <span>Deploying...</span>
        </AnimatedSpan>
        <TypingAnimation delay={5900} className="text-muted-foreground">
          🎉 Success! Project completed.
        </TypingAnimation>
        <TypingAnimation delay={8000} className="text-muted-foreground">
          🔥 Ready to deliver!
        </TypingAnimation>
      </Terminal>
    </div>

  </div>
</section>

    )
}