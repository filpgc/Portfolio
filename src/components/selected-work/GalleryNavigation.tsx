"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import cx from "classnames";

export const galleryControlButtonClass =
  "group grid size-9 after:absolute after:-inset-1 relative place-items-center rounded-full border-[0.5px] border-text-primary/12 bg-surface/92 text-text-primary shadow-[0_2px_7px_rgb(17_17_15/0.06)] backdrop-blur-xl transition-[background-color,border-color,opacity,transform] duration-150 ease-out hover:border-text-primary/22 hover:bg-text-primary/[0.025] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-project-accent disabled:cursor-default disabled:border-text-primary/8 disabled:bg-surface/80 disabled:text-text-muted disabled:opacity-35 disabled:active:scale-100 sm:size-8 dark:shadow-[0_2px_9px_rgb(0_0_0/0.2)] dark:hover:border-white/18 dark:hover:bg-white/[0.04]";

type GalleryNavigationProps = {
  slides: readonly { readonly title: string }[];
  currentIndex: number;
  onSelect: (index: number) => void;
  controlRefs: { current: Array<HTMLButtonElement | null> };
};

export default function GalleryNavigation({
  slides,
  currentIndex,
  onSelect,
  controlRefs,
}: GalleryNavigationProps) {
  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === slides.length - 1;

  return (
    <nav
      aria-label="Gallery navigation"
      className="absolute bottom-[max(0.85rem,env(safe-area-inset-bottom))] left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5 sm:gap-1.5"
    >
      <button
        type="button"
        aria-label="Previous slide"
        disabled={isFirstSlide}
        className={galleryControlButtonClass}
        onClick={() => onSelect(currentIndex - 1)}
      >
        <ArrowLeftIcon
          aria-hidden="true"
          className="size-3.5 transition-transform group-hover:-translate-x-px group-disabled:translate-x-0"
        />
      </button>

      <div className="flex h-9 items-center rounded-full border-[0.5px] border-text-primary/12 bg-surface/92 px-1.5 shadow-[0_2px_10px_rgb(17_17_15/0.07)] backdrop-blur-xl sm:h-8 dark:shadow-[0_2px_11px_rgb(0_0_0/0.2)]">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            ref={(node) => {
              controlRefs.current[index] = node;
            }}
            title={slide.title}
            type="button"
            aria-label={`View ${slide.title}`}
            aria-current={currentIndex === index ? "true" : undefined}
            className="group grid size-8 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-project-accent sm:size-7"
            onClick={() => onSelect(index)}
          >
            <span
              className={cx(
                "block h-px rounded-full transition-[width,background-color] duration-300",
                currentIndex === index
                  ? "w-5 bg-text-primary"
                  : "w-1.5 bg-text-primary/20 group-hover:w-3 group-hover:bg-text-primary/55 group-active:w-2",
              )}
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        aria-label="Next slide"
        disabled={isLastSlide}
        className={galleryControlButtonClass}
        onClick={() => onSelect(currentIndex + 1)}
      >
        <ArrowRightIcon
          aria-hidden="true"
          className="size-3.5 transition-transform group-hover:translate-x-px group-disabled:translate-x-0"
        />
      </button>
    </nav>
  );
}
