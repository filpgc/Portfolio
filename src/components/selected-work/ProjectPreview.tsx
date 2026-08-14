"use client";

import { ArrowRightIcon, EnterFullScreenIcon } from "@radix-ui/react-icons";
import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/project";
import { useDirectionalReveal } from "@/hooks/useDirectionalReveal";
import type { TabOrientation } from "./ProjectTab";

export const PROJECT_PREVIEW_SIZES =
  "(max-width: 1023px) calc(100vw - 4.5rem), 55vw";

type ProjectPreviewProps = {
  project: Project;
  orientation: TabOrientation;
  projectCount: number;
  onOpenGallery: () => void;
};

export default function ProjectPreview({
  project,
  orientation,
  projectCount,
  onOpenGallery,
}: ProjectPreviewProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      id={`${orientation}-project-preview`}
      role="tabpanel"
      aria-labelledby={`${orientation}-project-tab-${project.number}`}
      tabIndex={0}
      className={cx(
        "flex flex-col font-medium ease-out focus-visible:outline-[3px] focus-visible:-outline-offset-[6px]",
        isHorizontal
          ? "gap-6 p-4 pb-7"
          : "min-h-0 gap-6 border-l-[0.5px] border-current/25 p-10",
      )}
      style={{
        backgroundColor: project.color,
        color: project.textColor,
        outlineColor: project.textColor,
      }}
    >
      <PreviewHeader project={project} onOpenGallery={onOpenGallery} />
      <PreviewArtwork
        project={project}
        isHorizontal={isHorizontal}
        onOpenGallery={onOpenGallery}
      />
      <PreviewSummary project={project} projectCount={projectCount} />
    </div>
  );
}

function PreviewHeader({
  project,
  onOpenGallery,
}: {
  project: Project;
  onOpenGallery: () => void;
}) {
  const isStreamingCalculator = project.number === "02";

  return (
    <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-wide sm:text-xs">
      <span className="min-w-0 whitespace-nowrap tabular-nums">
        {project.number} /{" "}
        <span className="sm:hidden">{project.shortName}</span>
        <span className="hidden sm:inline">{project.name}</span>
      </span>
      <div className="flex shrink-0 flex-nowrap items-center justify-end gap-x-3 sm:gap-x-6">
        {isStreamingCalculator && (
          <Link
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group hidden min-h-11 items-center whitespace-nowrap text-right underline-offset-2 lg:flex"
          >
            <span className="group-hover:underline">Visit website</span>
            <span className="ml-1 transition-transform group-hover:-translate-y-px group-hover:translate-x-0.5">
              <ArrowRightIcon
                aria-hidden="true"
                className="size-3.5 -rotate-45"
              />
            </span>
          </Link>
        )}
        <button
          type="button"
          onClick={onOpenGallery}
          className="group flex min-h-11 items-center whitespace-nowrap text-right underline-offset-2"
        >
          <span className="uppercase sm:hidden">Explore</span>
          <span className="hidden uppercase sm:inline group-hover:underline">
            Explore project
          </span>
          <span className="mb-[1.5px] ml-1 inline-flex shrink-0 items-center transition-transform group-hover:scale-110">
            <EnterFullScreenIcon aria-hidden="true" className="size-3" />
          </span>
        </button>
      </div>
    </div>
  );
}

function PreviewArtwork({
  project,
  isHorizontal,
  onOpenGallery,
}: {
  project: Project;
  isHorizontal: boolean;
  onOpenGallery: () => void;
}) {
  const isStreamingCalculator = project.number === "02";
  const rotatesCounterClockwise = Number(project.number) % 2 === 1;
  const {
    ref: revealRef,
    onPointerEnter,
    onPointerLeave,
  } = useDirectionalReveal<HTMLSpanElement>();

  return (
    <div
      className={cx(
        "group flex items-center justify-center",
        !isHorizontal && "grow",
      )}
    >
      <button
        type="button"
        aria-label={`Explore ${project.name}`}
        className={cx(
          "group/action relative aspect-[3582/2114] translate-z-0 overflow-hidden rounded-sm border-[0.5px] border-white/20 shadow-2xl/40 transition-all duration-400 ease-out [backface-visibility:hidden]",
          isHorizontal
            ? "w-full"
            : "w-[92%] group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:shadow-2xl/60",
          rotatesCounterClockwise
            ? isHorizontal
              ? "rotate-[-0.4deg]"
              : "rotate-[-0.8deg] group-hover:-rotate-[0.2deg]"
            : isHorizontal
              ? "rotate-[0.4deg]"
              : "rotate-[0.8deg] group-hover:rotate-[0.2deg]",
        )}
        onClick={onOpenGallery}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        <Image
          key={project.number}
          alt={project.imageAlt}
          src={project.image}
          fill
          placeholder="blur"
          loading="lazy"
          className="object-contain object-center"
          sizes={PROJECT_PREVIEW_SIZES}
        />
        <span
          aria-hidden="true"
          className={cx(
            "absolute inset-0 bg-transparent transition-colors duration-200 ease-out",
            isStreamingCalculator
              ? "group-hover/action:bg-white/7 group-focus-visible/action:bg-white/7"
              : "group-hover/action:bg-black/7 group-focus-visible/action:bg-black/7",
          )}
        >
          <span className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span
              ref={revealRef}
              className={cx(
                "inline-flex scale-[0.96] group/button items-center gap-0.5 rounded-2xl border-[0.5px] border-neutral-100/35 bg-neutral-900/80 p-1 text-neutral-100 opacity-0 shadow-lg/20 backdrop-blur-md",
                "transition-[opacity,scale] duration-200 ease-out group-hover/action:scale-100 group-hover/action:opacity-100 group-focus-visible/action:scale-100 group-focus-visible/action:opacity-100",
              )}
            >
              <span className="flex items-center px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.06em]">
                Explore project
              </span>
              <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-neutral-100/10">
                <EnterFullScreenIcon
                  aria-hidden="true"
                  className="size-3.5 opacity-90 group-hover/button:opacity-100 group-hover/button:scale-105"
                />
              </span>
            </span>
          </span>
        </span>
      </button>
    </div>
  );
}

function PreviewSummary({
  project,
  projectCount,
}: {
  project: Project;
  projectCount: number;
}) {
  return (
    <div className="mt-1 flex items-end justify-between gap-4 lg:mt-3">
      <div className="min-w-0 flex-1">
        <p className="max-w-[40ch] text-pretty text-sm leading-5 sm:max-w-[45ch] 3xl:max-w-[55ch] sm:text-base sm:leading-normal">
          {project.description}
        </p>
        <div className="mt-4 grid gap-3 border-t-[0.5px] border-current/25 pt-3 sm:grid-cols-2 sm:gap-8">
          <div>
            <span className="block text-[9px] font-bold uppercase tracking-widest opacity-75 sm:text-[10px]">
              Role
            </span>
            <p className="mt-1 text-[11px] font-semibold leading-4 sm:text-xs sm:leading-5">
              {project.role}
            </p>
          </div>
          <div>
            <span className="block text-[9px] font-bold uppercase tracking-widest opacity-75 sm:text-[10px]">
              {project.evidenceLabel}
            </span>
            <p className="mt-1 max-w-[52ch] text-pretty text-[11px] leading-4 mr-10 sm:text-xs sm:leading-5">
              {project.evidence}
            </p>
          </div>
        </div>
      </div>
      <span className="shrink-0 text-xs">
        {project.number} / {String(projectCount).padStart(2, "0")}
      </span>
    </div>
  );
}
