import { Separator } from "@/components/ui/separator"
import { Quote } from "lucide-react"

export function FounderStory() {
  return (
    <section className="w-full bg-primary-light/20 dark:bg-primary-light/10">
      <div className="py-24 px-6 md:px-8 lg:px-10 max-w-3xl mx-auto text-center">
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Why I Built Linkato
          </h2>

          <Separator className="mx-auto w-12 bg-primary h-[2px]" />
<Quote className="w-8 h-8 text-primary opacity-70" />
          <div className="relative text-muted-foreground text-base sm:text-lg leading-relaxed">
            

            <p className="italic">
              I built <span className="font-bold text-foreground">Linkato</span> because I was tired of setting up the same things over and over —
              <span className="font-semibold text-foreground">auth</span>, 
              <span className="font-semibold text-foreground">dashboards</span>, 
              <span className="font-semibold text-foreground">basic pages</span>, and 
              <span className="font-semibold text-foreground">waitlists</span> — before I could focus on my actual product.
            </p>

            <p className="mt-4">
              It&apos;s designed mainly for <span className="font-semibold text-foreground">SaaS projects</span>, 
              because that&apos;s what I build most often — but it works just as well for other types of web apps.
              Whether you&apos;re a solo founder, indie hacker, or small team starting something new, 
              <span className="font-bold text-foreground">Lunitea</span> can help you skip the boilerplate and start with a strong, clean base.
            </p>
          </div>
          <Quote className="w-8 h-8 text-primary opacity-70" />
        </div>
      </div>
    </section>
  )
}
