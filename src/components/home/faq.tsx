"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Lunitea?",
    answer:
      "Lunitea is Boilerplate more than a template. It’s a full-stack solution for building modern web applications saving you months of development time.",
  },
  {
    question: "is Lunitea SaaS boilerplate?",
    answer:
      "Lunitea is open project can match any type of web application, including SaaS, Starup, platforms, muliple tenants...etc, It’s a flexible foundation for any project.",
  },
  {
    question: "can i resell it?",
    answer:
      "NO, you can’t resell Lunitea as it is, but you can use it as a base for your own product and sell that product.",
  },
   {
    question: "can i work with you?",
    answer:
      "if you have your Lunitea copy we will offer a market place where you can sell your own copy after review it, if you are interested please reach out to us via email.",
  },
  {
    question: "why there is no email sender?",
    answer:
      "we know the important of email sender, but we want to keep the project clean and simple currently, you can add any email sender you like, we also added exporing emails button so you can use other external tools.",
  },
  {
    question: "is it uncluded payment system?",
    answer:
      "currently, we don’t include any payment system since Lunitea is open starter project not focusing on subscription apps, but we let you know this we be available in the neer future.",
  },
  {
    question: "can i get new updates?",
    answer:
      "Yes, we will keep updating & improving with new features, bugs fixes, and add market place for more boilerplates matching more busnisses. you will receive updates via email, and make sure you follow us on twitter and linkedin.",
  },
  {
    question: "is there a documentation?",
    answer:
      "not yet, but we will provide a full documentation for Lunitea when it have more features and copies, for now lunitea is exremly simple and easy to use with detailed Readme file.",
  },

]

export function Faq() {
  return (
    <section className="py-24 px-4 border-y border-border bg-muted/10 dark:bg-muted/5">
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
              className="border border-border rounded-xl bg-muted/30 dark:bg-muted/20"
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
