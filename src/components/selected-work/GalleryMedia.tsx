"use client";

import type { Project } from "@/content/project";
import cx from "classnames";
import Image from "next/image";
import { useEffect, useRef } from "react";

type GalleryItem = Project["gallery"][number];

export default function GalleryMedia({
  item,
  priority,
  active,
}: {
  item: GalleryItem;
  priority: boolean;
  active: boolean;
}) {
  if ("videoSrc" in item) {
    return <GalleryVideo item={item} active={active} />;
  }

  if (!("images" in item)) {
    return (
      <Image
        alt={item.alt}
        src={item.image}
        fill
        placeholder="blur"
        priority={priority}
        className="object-contain object-center"
        sizes="(min-width: 1024px) 65vw, (min-width: 640px) 84vw, 100vw"
      />
    );
  }

  if (item.images.length === 2) {
    return (
      <div className="flex size-full items-center justify-center gap-1.5 bg-[#171816] sm:gap-2">
        {item.images.map((frame) => (
          <PosterFrame
            key={getImageKey(frame.image)}
            frame={frame}
            priority={priority}
            sizes="36vw"
            className="h-full shrink-0 rounded-[5.6px] border-[0.5px] border-white/12 shadow-[0_4px_14px_rgb(0_0_0/0.18)] sm:rounded-[10px]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid size-full grid-cols-3 items-center justify-center gap-1.5 bg-[#171816] p-2 sm:gap-4 sm:p-6">
      {item.images.map((frame) => (
        <PosterFrame
          key={getImageKey(frame.image)}
          frame={frame}
          priority={priority}
          sizes="30vw"
          className="w-full rounded-[5.6px] border-[0.5px] border-white/12 shadow-[0_6px_18px_rgb(0_0_0/0.22)] sm:rounded-[10px]"
        />
      ))}
    </div>
  );
}

type VideoGalleryItem = Extract<GalleryItem, { videoSrc: unknown }>;

function GalleryVideo({
  item,
  active,
}: {
  item: VideoGalleryItem;
  active: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!active) videoRef.current?.pause();
  }, [active]);

  return (
    <video
      ref={videoRef}
      src={item.videoSrc}
      poster={getImageKey(item.image)}
      aria-label={item.alt}
      controls
      muted
      playsInline
      preload="metadata"
      className="size-full object-contain object-center"
    />
  );
}

type PosterFrameData = Extract<
  GalleryItem,
  { images: unknown }
>["images"][number];

function PosterFrame({
  frame,
  priority,
  sizes,
  className,
}: {
  frame: PosterFrameData;
  priority: boolean;
  sizes: string;
  className: string;
}) {
  return (
    <div
      className={cx("relative overflow-hidden", className)}
      style={{
        aspectRatio:
          typeof frame.image === "string"
            ? "0.63"
            : `${frame.image.width} / ${frame.image.height}`,
      }}
    >
      <Image
        alt={frame.alt}
        src={frame.image}
        fill
        priority={priority}
        className="object-contain object-center"
        sizes={sizes}
      />
    </div>
  );
}

function getImageKey(image: PosterFrameData["image"]) {
  return typeof image === "string" ? image : image.src;
}
