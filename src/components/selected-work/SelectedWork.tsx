"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeader from "@/components/home/SectionHeader";
import { projects } from "@/content/project";
import { KeyboardIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Gallery from "./Gallery";
import ProjectPreview, { PROJECT_PREVIEW_SIZES } from "./ProjectPreview";
import ProjectTab from "./ProjectTab";
import type { KeyboardEvent } from "react";
import type { Project } from "@/content/project";
import type { TabOrientation } from "./ProjectTab";

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoadProjectImages, setShouldLoadProjectImages] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedWorkID, setSelectedWorkID] = useState<Project["number"]>(
    projects[0].number,
  );
  const selectedWork =
    projects.find((project) => project.number === selectedWorkID) ??
    projects[0];

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !("IntersectionObserver" in window)) {
      setShouldLoadProjectImages(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setShouldLoadProjectImages(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
    orientation: TabOrientation,
  ) {
    const isHorizontal = orientation === "horizontal";
    const forwardKey = isHorizontal ? "ArrowRight" : "ArrowDown";
    const backwardKey = isHorizontal ? "ArrowLeft" : "ArrowUp";
    let nextIndex: number | undefined;

    if (event.key === forwardKey) {
      nextIndex = (index + 1) % projects.length;
    } else if (event.key === backwardKey) {
      nextIndex = (index - 1 + projects.length) % projects.length;
    }

    if (nextIndex === undefined) return;

    event.preventDefault();
    const nextProject = projects[nextIndex];
    setSelectedWorkID(nextProject.number);
    requestAnimationFrame(() => {
      document
        .getElementById(`${orientation}-project-tab-${nextProject.number}`)
        ?.focus();
    });
  }

  const renderProjectTab = (
    project: Project,
    index: number,
    orientation: TabOrientation,
  ) => (
    <ProjectTab
      key={project.number}
      orientation={orientation}
      project={project}
      isSelected={project === selectedWork}
      onSelect={() => setSelectedWorkID(project.number)}
      onKeyDown={(event) => handleTabKeyDown(event, index, orientation)}
    />
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="selected-work-title"
      className="mb-24 scroll-mt-4 sm:mb-44 sm:scroll-mt-10"
    >
      {shouldLoadProjectImages && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute size-0 overflow-hidden"
        >
          {projects.map((project) => (
            <Image
              key={project.number}
              alt=""
              src={project.image}
              width={project.image.width}
              height={project.image.height}
              sizes={PROJECT_PREVIEW_SIZES}
              loading="eager"
            />
          ))}
        </div>
      )}

      <SectionHeader
        id="selected-work-title"
        title="Selected Work"
        description="Enterprise AI, an independent creator platform, and a consumer marketplace."
      >
        <KeyboardIcon className="size-4" />
      </SectionHeader>

      <div className="mt-8 border-b border-border-subtle lg:hidden">
        <div
          role="tablist"
          aria-label="Selected projects"
          aria-orientation="horizontal"
          className="grid grid-cols-3 border-b border-border-subtle"
        >
          {projects.map((project, index) =>
            renderProjectTab(project, index, "horizontal"),
          )}
        </div>
        <ProjectPreview
          project={selectedWork}
          orientation="horizontal"
          projectCount={projects.length}
          onOpenGallery={() => setIsGalleryOpen(true)}
        />
      </div>

      <div className="hidden min-h-[690px] grid-cols-[minmax(290px,.72fr)_minmax(520px,1.28fr)] border-b border-border-strong lg:grid">
        <div
          role="tablist"
          aria-label="Selected projects"
          aria-orientation="vertical"
          className="flex grow flex-col"
        >
          {projects.map((project, index) => (
            <div
              className="group not-last:border-b not-last:border-b-border-subtle"
              key={project.number}
            >
              {renderProjectTab(project, index, "vertical")}
            </div>
          ))}
        </div>
        <ProjectPreview
          project={selectedWork}
          orientation="vertical"
          projectCount={projects.length}
          onOpenGallery={() => setIsGalleryOpen(true)}
        />
      </div>

      {isGalleryOpen && (
        <Gallery
          project={selectedWork}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}
    </section>
  );
}
