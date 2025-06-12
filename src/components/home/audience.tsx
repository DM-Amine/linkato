/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const audienceProfiles = [
  {
    name: "Developers",
    body: "Launch clean public pages for your tools or side projects without spending hours on setup.",
  },
  {
    name: "Content Creators",
    body: "Create a simple, elegant landing page to share your latest work or updates with followers.",
  },
    {
    name: "Personal",
    body: "Create a personal home on the web — highlight your habbits, socials, or anything else you care about.",
  },
  {
    name: "Bloggers",
    body: "Set up a minimalist blog or portfolio page that highlights your writing without distractions.",
  },
  {
    name: "Artists",
    body: "Showcase your art or photography with a clean, distraction-free gallery that loads fast.",
  },
  {
    name: "Musicians",
    body: "Create a simple landing page for your music, albums, or upcoming shows with no hassle.",
  },
  {
    name: "Podcasters",
    body: "Launch a professional podcast landing page to share episodes and connect with listeners.",
  },
  {
    name: "Writers",
    body: "Build a clean, distraction-free page to share your writing portfolio or latest articles.",
  },
  {
    name: "Educators",
    body: "Create a simple page to share course materials, resources, or updates with students.",
  },
  {
    name: "Influencers",
    body: "Set up a sleek landing page to share your latest content and connect with followers.",
  },
  {
    name: "Photographers",
    body: "Showcase your photography portfolio with a clean, minimalist layout that highlights your work.",
  },
  {
    name: "Creators",
    body: "Share all your links and content in one place — fast to set up, easy to maintain.",
  },
  {
    name: "Founders",
    body: "Build a presence for your startup, share updates, and connect with early users or investors.",
  },
  {
    name: "Entrepreneurs",
    body: "Set up a public page for your product or idea with a professional look, zero friction.",
  },
  {
    name: "Designers",
    body: "Present your portfolio with minimal, aesthetic layouts — no custom code needed.",
  },
  {
    name: "Marketers",
    body: "Centralize campaign links or social profiles with pages that load fast and look clean.",
  },
  {
    name: "Agencies",
    body: "Showcase services or client projects using simple, no-fuss landing pages.",
  },
];

const firstRow = audienceProfiles.slice(0, 3);
const secondRow = audienceProfiles.slice(3);

const AudienceCard = ({
 
    name,

    body,
}: {

    name: string;
  
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-fit sm:w-44 md:w-56 cursor-default overflow-hidden rounded-xl border p-4 transition-colors duration-300",
                // light mode
                "border-neutral-200 bg-white hover:bg-neutral-50",
                // dark mode
                "dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
        >
            <div className="flex flex-row items-center gap-3">
                {/* <img className="rounded-full" width="40" height="40" alt={name} src={img} /> */}
                <div className="flex flex-col">
                    <figcaption className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {name}
                    </figcaption>
                    
                </div>
            </div>
            <blockquote className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">{body}</blockquote>
        </figure>
    );
};

function AudienceMarquee() {
    return (
        <section className="flex my-14 mx-auto rounded-[2rem] ring-[14px] ring-neutral-400 dark:ring-neutral-700 flex-col justify-center items-center bg-primary overflow-hidden relative">
  <h1 className="text-5xl text-neutral-700 font-bold py-6 text-center w-full rounded-t-[2rem]">
    Elegant Simplicity for Every Workflow!
  </h1>

  {/* Cards + Marquee Container */}
  <div className="relative flex h-[32rem] w-full items-center justify-center gap-4 [perspective:2000px] overflow-hidden">
    <div
      className="flex flex-row items-center gap-6"
      style={{
        transform:
          "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
      }}
    >
      <Marquee pauseOnHover vertical className="[--duration:24s]">
        {firstRow.map((item) => (
          <AudienceCard key={`${item.name}-1`} {...item} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:24s]">
        {secondRow.map((item) => (
          <AudienceCard key={`${item.name}-2`} {...item} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:24s]">
        {firstRow.map((item) => (
          <AudienceCard key={`${item.name}-3`} {...item} />
        ))}
      </Marquee>
      <Marquee pauseOnHover vertical className="[--duration:24s]">
        {secondRow.map((item) => (
          <AudienceCard key={`${item.name}-4`} {...item} />
        ))}
      </Marquee>
    </div>

    {/* Top & Bottom Inset Smoke Overlays */}
    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary via-primary/40 to-transparent z-10 rounded-t-[2rem]" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary via-primary/40 to-transparent z-10 rounded-b-[2rem]" />
  </div>
</section>


    );
}

export default AudienceMarquee;
