'use client'


const steps = [
  {
    step: "1",
    title: "Sign Up",
    desc: "Enter your email or connect with Google. Instantly create your first page.",
  },

  {
    step: "2",
    title: "create your first page",
    desc: "Upload cover & avatar, pick a monochrome theme, add your links.",
  },
  {
    step: "3",
    title: "Share",
    desc: "copy your page link and share it where ever you want, include your socials bio.",
  },
]


export default function HowItWorks() {
  return (
 <section id="how-it-works" className="sm:my-34 ">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <div className="flex border border-neutral-400 dark:border-neutral-600 py-6 px-4 rounded-4xl flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 sm:space-x-8">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="max-w-sm sm:h-[220px] h-fit  space-y-4">
                <div className="mx-auto text-2xl w-12 h-12 flex items-center shadow-lg justify-center rounded-full ring-8 ring-neutral-100 dark:ring-neutral-800  bg-gradient-to-br from-primary/40 to-primary/90 
                      dark:from-d-primary-light/40 dark:to-primary/30  text-neutral-700 dark:text-neutral-200  font-semibold">
                  {step}
                </div>
                <h4 className="text-xl font-medium">{title}</h4>
                <p className="text-neutral-600 dark:text-neutral-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}
