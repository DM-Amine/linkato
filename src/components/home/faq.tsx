"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is it free?",
    answer:
      "Yes, all current features are free for personal use.",
  },
  {
    question: "Is my data private?",
    answer:
      "Absolutely. Your private links and pages are only visible to you unless you choose to share them.",
  },
  {
    question: "Is there a limit on the number of links?",
    answer:
      "No. You can add as many links as you like to your page without restrictions.",
  },
  {
    question: "How many pages can I create?",
    answer:
      "You can create one page with the personal plan. Unlimited pages will be available in the upcoming business plan.",
  },
  {
    question: "Is there any hidden watermark?",
    answer:
      "No. We don't add any hidden watermarks or branding. Your pages stay clean and professional.",
  },
  {
    question: "Are the themes customizable?",
    answer:
      "To maintain a clean and high-conversion design, themes are minimalist in black and white. You can still personalize your page with your brand color, avatar, and cover image.",
  },
]

export function Faq() {
  return (
    <section className="py-24 px-4 bg-muted/10 dark:bg-muted/5">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="border-b rounded-2xl">
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-xl bg-muted/30 dark:bg-muted/20"
            >
              <AccordionTrigger className="text-left px-4 py-3 text-base font-medium text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </div>
      </div>
    </section>
  )
}
