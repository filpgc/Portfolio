import { ArrowDownIcon } from "@radix-ui/react-icons";
import HeroSoundSketch from "./HeroSoundSketch";

export default function HomeHero() {
  const summary =
    "I lead frontend at Outverse, working across product design and engineering. Before that, I worked at Treatwell. I also run Streaming Calculator and release music as Moyo.";

  return (
    <section
      aria-labelledby="home-title"
      className="flex min-h-[calc(100svh-68px)] flex-col gap-8 py-8 sm:min-h-[calc(100svh-78px)] sm:gap-15 sm:py-12"
    >
      <HeroSoundSketch />

      <div className="flex flex-1 flex-col md:hidden">
        <span className="my-auto max-w-[54ch] text-[0.95rem] leading-6">
          {summary}
        </span>

        <a
          href="#work"
          className="group flex min-h-12 items-center justify-between border-b-[0.5px] border-border-strong py-3 text-sm font-bold leading-none "
        >
          <span>See the work</span>
          <ArrowDownIcon
            aria-hidden="true"
            className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-y-1 group-focus-visible:translate-y-1"
          />
        </a>
      </div>

      <div className="mt-auto hidden grid-cols-[1fr_minmax(200px,500px)] items-end gap-10 md:mt-28 md:grid 3xl:mb-[12vh] 3xl:mt-auto">
        <span className="max-w-[54ch] text-[0.95rem] leading-6 sm:text-base">
          {summary}
        </span>

        <a
          href="#work"
          className="group flex h-fit min-h-11 items-center justify-between border-b-[0.5px] border-border-strong py-2 text-sm font-bold leading-none transition-[color,border-color,opacity] hover:border-project-accent hover:text-project-accent focus-visible:border-project-accent focus-visible:text-project-accent active:opacity-85"
        >
          <span>See the work</span>
          <ArrowDownIcon
            aria-hidden="true"
            className="ml-1 size-3.5 transition-transform duration-200 ease-out group-hover:translate-y-1 group-focus-visible:translate-y-1"
          />
        </a>
      </div>
    </section>
  );
}
