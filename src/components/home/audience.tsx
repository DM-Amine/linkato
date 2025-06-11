/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const audienceProfiles = [
    {
        name: "Developers",
        username: "Build and scale apps faster",
        body: "Ship production-ready pages, customize themes, and connect with your stack in minutes.",
        
    },
    {
        name: "Creators",
        username: "Focus on content, not code",
        body: "Design beautiful pages, share your work, and grow your audience without needing a developer.",
       
    },
    {
        name: "Entrepreneurs",
        username: "Launch your ideas quickly",
        body: "Validate ideas, build landing pages, and grow your brand with ease and flexibility.",
      
    },
    {
        name: "Designers",
        username: "Pixel-perfect control",
        body: "Craft beautiful UIs effortlessly with modern components and theming options.",
       
    },
    {
        name: "Marketers",
        username: "Drive growth & engagement",
        body: "Optimize SEO, share links, and capture leads with performance in mind.",
      
    },
    {
        name: "Agencies",
        username: "Serve more clients faster",
        body: "Create reusable templates, manage client sites, and scale delivery.",
      
    },
];

const firstRow = audienceProfiles.slice(0, 3);
const secondRow = audienceProfiles.slice(3);

const AudienceCard = ({
 
    name,
    username,
    body,
}: {

    name: string;
    username: string;
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
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">{username}</p>
                </div>
            </div>
            <blockquote className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">{body}</blockquote>
        </figure>
    );
};

function AudienceMarquee() {
    return (
        <section className="flex my-14 mx-auto rounded-4xl ring-14 ring-neutral-400  dark:ring-neutral-700  flex-col justify-center items-center bg-primary">
  <h1 className="text-5xl text-neutral-700 font-bold py-6 text-center rounded-tr-2xl rounded-tl-2xl">
    Elegant Simplicity for Every Workflow!
  </h1>

  <div className="relative flex h-[32rem] w-full items-center justify-center gap-4 overflow-hidden [perspective:2000px]">
    {/* Cards Container with 3D Transform */}
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

    {/* 🟦 Top & Bottom Inset "Smoke" Effects */}
    <div className="pointer-events-none rounded-[36px] absolute -top-1 inset-x-0  h-30 bg-gradient-to-b from-primary via-primary/40 to-transparent z-10 blur-sm" />
    <div className="pointer-events-none rounded-[36px] absolute inset-x-0 bottom-0 h-30 bg-gradient-to-t from-primary via-primary/40 to-transparent z-10 blur-sm" />

   
  </div>
</section>

    );
}

export default AudienceMarquee;
