"use client";

import type { Project } from "@/content/project";
import { ArrowTopRightIcon, Cross1Icon } from "@radix-ui/react-icons";
import cx from "classnames";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import GalleryMedia from "./GalleryMedia";
import GalleryNavigation, {
  galleryControlButtonClass,
} from "./GalleryNavigation";

export default function Gallery({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [currentViewIX, setCurrentViewIX] = useState(0);
  const currentViewRef = useRef(0);
  const scrollFrameRef = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const slideControlRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const images = project.gallery;
  const galleryLink = project.galleryLink;

  const closeDialog = () => dialogRef.current?.close();

  const scrollToSlide = useCallback(
    (index: number) => {
      if (index < 0 || index >= images.length) return;

      const scroller = scrollerRef.current;
      const slide = slideRefs.current[index];
      if (!scroller || !slide) return;

      currentViewRef.current = index;
      setCurrentViewIX(index);
      scroller.scrollTo({
        left: slide.offsetLeft - (scroller.clientWidth - slide.clientWidth) / 2,
        behavior: "smooth",
      });
    },
    [images.length],
  );

  const syncCurrentSlide = () => {
    if (scrollFrameRef.current !== null) return; // a callback is already scheduled

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const viewportCentre = scroller.scrollLeft + scroller.clientWidth / 2;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      slideRefs.current.forEach((slide, index) => {
        if (!slide) return;

        const slideCentre = slide.offsetLeft + slide.clientWidth / 2;
        const distance = Math.abs(viewportCentre - slideCentre);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      if (nearestIndex !== currentViewRef.current) {
        currentViewRef.current = nearestIndex;
        setCurrentViewIX(nearestIndex);
      }
    });
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    dialog.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (event.target instanceof HTMLMediaElement) return;

      event.preventDefault();
      const nextIndex =
        event.key === "ArrowLeft"
          ? currentViewRef.current - 1
          : currentViewRef.current + 1;

      if (nextIndex < 0 || nextIndex >= images.length) return;
      scrollToSlide(nextIndex);
      slideControlRefs.current[nextIndex]?.focus({ preventScroll: true });
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length, scrollToSlide]);

  return (
    <dialog
      ref={dialogRef}
      tabIndex={-1}
      aria-label={`${project.name} selected work`}
      className="gallery-dialog fixed bg-transparent inset-0 m-0 size-full max-h-none max-w-none overscroll-contain outline-0  p-20 outline-none backdrop:bg-black/25 backdrop:backdrop-blur-[3px] dark:backdrop:bg-black/55"
      onClose={onClose}
      onClick={(event) => {
        if (event.currentTarget === event.target) closeDialog();
      }}
    >
      <div className="gallery-panel-enter absolute sm:inset-10 inset-0 isolate m-auto overflow-hidden outline-[0.5px] outline-text-primary/12 bg-surface/98 shadow-[0_24px_80px_-24px_rgb(17_17_15/0.38),0_2px_10px_rgb(17_17_15/0.08)] max-w-[2000px] max-h-[1200px] sm:rounded-[18px]  lg:rounded-3xl dark:shadow-[0_28px_90px_-24px_rgb(0_0_0/0.72),0_2px_12px_rgb(0_0_0/0.32)]">
        <GalleryNavigation
          slides={images}
          currentIndex={currentViewIX}
          onSelect={scrollToSlide}
          controlRefs={slideControlRefs}
        />
        {galleryLink && (
          <Link
            href={galleryLink.href}
            target="_blank"
            rel="noreferrer"
            className={cx(
              "group absolute active:scale-97 bottom-[max(0.80rem,env(safe-area-inset-bottom))] left-3 z-20 flex min-h-8 items-center rounded-full outline-[0.5px] outline-text-primary/12 bg-surface/92 px-3 text-[10px] font-semibold uppercase tracking-wider text-text-primary shadow-[0_2px_7px_rgb(17_17_15/0.05)] backdrop-blur-xl transition-[background-color,outline-color] duration-150 hover:outline-text-primary/22 hover:bg-text-primary/[0.025] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-project-accent sm:bottom-4 sm:left-4 dark:shadow-[0_2px_9px_rgb(0_0_0/0.18)] dark:hover:outline-white/18 dark:hover:bg-white/[0.04]",
              galleryLink.hideOnMobile && "max-sm:hidden",
            )}
          >
            {galleryLink.label}
            <ArrowTopRightIcon
              aria-hidden="true"
              className="ml-1 size-3 transition-transform duration-150 group-hover:-translate-y-px group-hover:translate-x-px"
            />
          </Link>
        )}
        <div className="absolute left-3 top-3 z-20 flex h-8 max-w-[calc(100%-4.75rem)] items-center gap-1.5 rounded-full outline-[0.5px] outline-text-primary/12 bg-surface/92 px-3 text-[10px] font-semibold uppercase tracking-wider text-text-primary shadow-[0_2px_7px_rgb(17_17_15/0.05)] backdrop-blur-xl sm:left-4 sm:top-4 sm:max-w-[calc(100%-5rem)] dark:shadow-[0_2px_9px_rgb(0_0_0/0.18)]">
          <span className="truncate">{project.name}</span>
          <span className="text-text-muted" aria-hidden="true">
            /
          </span>
          <span className="shrink-0 text-text-muted sm:hidden">
            Selected work
          </span>
          <span className="hidden shrink-0 text-text-muted sm:inline">
            {project.role}
          </span>
        </div>
        <div className="absolute right-3 top-3 z-20 sm:right-4 sm:top-4">
          <button
            type="button"
            aria-label="Close gallery"
            className={galleryControlButtonClass}
            onClick={closeDialog}
          >
            <Cross1Icon className="size-3.5 text-text-primary transition-transform group-hover:scale-110" />
          </button>
        </div>
        <div
          ref={scrollerRef}
          onScroll={syncCurrentSlide}
          role="region"
          aria-label="Project gallery"
          className="relative flex size-full snap-x snap-mandatory gap-x-5 overflow-x-auto overflow-y-hidden overscroll-contain px-4 pb-16 pt-16 sm:gap-x-10 sm:px-8 sm:pb-16 sm:pt-20 lg:mt-4 lg:gap-x-40 lg:p-17"
        >
          {images.map((item, index) => (
            <div
              key={item.title}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              role="group"
              aria-label={`${index + 1} of ${images.length}: ${item.title}`}
              className="mt-2 flex min-w-0 basis-full shrink-0 snap-center flex-col overflow-y-auto rounded-lg pb-8 sm:basis-[84%] sm:overflow-visible sm:pb-0 md:mt-0 md:basis-[max(14rem,min(82%,calc(170dvh-40rem)))] lg:basis-[max(14rem,min(65%,calc(170dvh-50rem)))] 2xl:max-w-[100rem]"
            >
              <p className="mb-3 text-xs font-semibold text-text-primary sm:mb-4 sm:text-sm">
                {item.title}
              </p>
              <div
                className="relative w-full shrink-0 overflow-hidden rounded-[10px] outline-[0.5px] outline-text-primary/12 bg-surface shadow-[0_18px_50px_-26px_rgb(17_17_15/0.38)] after:absolute after:top-1/2 after:z-10 after:hidden after:h-[0.5px] after:w-19 after:-right-19.5 after:bg-outline-subtle sm:rounded-xl lg:after:block dark:shadow-[0_20px_56px_-24px_rgb(0_0_0/0.68)]"
                style={{
                  aspectRatio:
                    "aspectRatio" in item
                      ? item.aspectRatio
                      : typeof item.image === "string"
                        ? "1.7"
                        : `${item.image.width} / ${item.image.height}`,
                }}
              >
                <GalleryMedia
                  item={item}
                  priority={index === 0}
                  active={currentViewIX === index}
                />
              </div>
              <div className="relative mb-8 mt-5 max-w-3xl text-sm leading-6 text-text-primary sm:mb-16 sm:mt-8 sm:text-base lg:mb-20 lg:mt-10">
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
}
