"use client";

import { tracks } from "@/content/music";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowTopRightIcon,
  CookieIcon,
  PauseIcon,
  PlayIcon,
} from "@radix-ui/react-icons";
import cx from "classnames";
import SectionHeader from "./SectionHeader";
import { useAudio } from "@/app/context/AudioContext";

export default function MusicPreview() {
  const { markAsActive } = useAudio();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play();
    } else {
      audio.pause();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const syncDuration = () => {
      if (Number.isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("durationchange", syncDuration);

    if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
      syncDuration();
    }

    return () => {
      audio.removeEventListener("loadedmetadata", syncDuration);
      audio.removeEventListener("durationchange", syncDuration);
    };
  }, []);

  return (
    <section
      id="music"
      aria-label="Music by Moyo"
      className="-mx-page-padding min-h-[520px] scroll-mt-4 border-border-strong sm:scroll-mt-24 lg:border-t-[0.5px]"
    >
      <div className="*:px-page-padding pt-6 lg:hidden">
        <SectionHeader
          id="music-mobile-title"
          title="Music"
          description="Original music I write and release as Moyo."
        >
          <CookieIcon className="size-4" />
        </SectionHeader>
      </div>
      <div className="grid h-full grid-cols-1 lg:grid-cols-2">
        <div className="hidden min-h-[420px] flex-col justify-between gap-10 px-page-padding py-10 sm:min-h-[520px] sm:gap-18 sm:py-14 lg:flex lg:min-h-0 3xl:min-h-[900px] 3xl:py-20">
          <div className="grid grid-cols-[2rem_1fr] items-center md:grid-cols-[45px_.45fr_1fr] gap-x-3">
            <span
              className="flex size-6 items-center text-text-muted"
              aria-hidden="true"
            >
              <CookieIcon className="size-4" />
            </span>
            <span className="font-bold">Music · Moyo</span>
          </div>

          <h2 className="max-w-[10ch] text-[clamp(3rem,13vw,6rem)] font-medium leading-[0.9] tracking-tighter sm:text-[clamp(3rem,8vw,6rem)] lg:text-[clamp(3rem,6vw,6rem)] 3xl:text-[7rem]">
            I make music, too.
          </h2>

          <p className="text-[0.95rem] leading-6 sm:text-base">
            Music I write and release as Moyo.
          </p>
        </div>
        <div className="relative grow overflow-hidden p-page-padding sm:p-10 lg:border-l-[0.5px] lg:border-border-strong lg:p-12 3xl:min-h-[900px] 3xl:p-20">
          <Image
            alt=""
            aria-hidden="true"
            src={tracks[0].artwork}
            fill
            className="pointer-events-none absolute inset-0 scale-190 select-none object-cover object-center blur-[34px] dark:opacity-10 opacity-25 brightness-145 dark:brightness-100"
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
          <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(190px,.60fr)] sm:gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(220px,.60fr)] lg:gap-0 3xl:h-full 3xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,.9fr)] 3xl:items-center 3xl:gap-20">
            <div className="relative isolate mx-auto aspect-square w-[98%] max-w-[36rem] rotate-[-0.8deg] sm:max-w-none 3xl:w-full 3xl:max-w-[44rem]">
              <div
                className={cx(
                  "absolute inset-0 overflow-hidden rounded-full border-[0.5px] border-border-strong outline-[0.5px] outline-offset-[0.5px] outline-text-primary/10 shadow-md/20 animate-[spin_14s_linear_infinite]",
                  isPlaying
                    ? "[animation-play-state:running]"
                    : "[animation-play-state:paused]",
                )}
              >
                <Image
                  alt={`${tracks[0].title} cover artwork`}
                  src={tracks[0].artwork}
                  width={1080}
                  height={1080}
                  className="h-full w-full object-cover object-center"
                  sizes="(max-width: 639px) calc(100vw - 3rem), (max-width: 1023px) 60vw, 32vw"
                />
              </div>

              <button
                type="button"
                aria-label={isPlaying ? "Pause Catch Me" : "Play Catch Me"}
                onClick={togglePlayback}
                className="group absolute left-1/2 top-1/2 z-10 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[0.5px] border-white/90 bg-white/85 backdrop-blur-xl transition-[background-color,border-color,transform,scale] duration-200 ease-out hover:bg-white/95 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-project-accent sm:size-30 dark:border-white/15 dark:bg-black/70 dark:text-neutral-50 dark:hover:border-white/25 dark:hover:bg-black/80"
              >
                {isPlaying ? (
                  <PauseIcon className="size-8 transition-transform duration-300 group-hover:scale-110" />
                ) : (
                  <PlayIcon className="size-9 translate-x-0.5 transition-transform duration-300 group-hover:scale-110" />
                )}
              </button>
            </div>
            <div className="relative mt-auto flex flex-col gap-2 p-0 pt-2 font-medium sm:p-6 sm:pr-0 lg:p-8 lg:pr-0 3xl:my-auto 3xl:w-full 3xl:max-w-[34rem] 3xl:translate-y-6 3xl:justify-self-center 3xl:gap-0 3xl:p-0">
              <span className="uppercase text-[10px] tracking-widest 3xl:mb-4">
                Now Playing
              </span>
              <span className="text-[clamp(2.75rem,13vw,3.5rem)] font-semibold leading-none tracking-tighter sm:text-5xl 3xl:text-7xl">
                {tracks[0].title}
              </span>
              <span className="mb-4 text-xs tracking-widest sm:mb-8 3xl:mb-0 3xl:mt-3 3xl:text-sm">
                {tracks[0].artist}
              </span>
              <audio
                ref={audioRef}
                src={tracks[0].audioSrc}
                onTimeUpdate={(e) => {
                  setCurrentTime(e.currentTarget.currentTime);
                }}
                onPlay={() => {
                  if (audioRef.current) {
                    markAsActive(audioRef.current);
                  }
                  setIsPlaying(true);
                }}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                preload="metadata"
              ></audio>
              <a
                href={tracks[0].spotifyUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-10 items-center self-start rounded-full border-[0.5px] border-white/60 bg-white/40 px-3 text-[11px] font-semibold tracking-tight text-project-accent backdrop-blur-2xl backdrop-brightness-115 transition-colors hover:border-white/80 hover:bg-white/80 sm:self-center 3xl:mt-8 3xl:min-h-11 3xl:self-start 3xl:px-4 3xl:text-xs dark:border-white/25 dark:bg-black/30 dark:hover:border-white/25 dark:hover:bg-black/55"
              >
                Open in Spotify
                <ArrowTopRightIcon
                  aria-hidden="true"
                  className="ml-0.5 size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:scale-110"
                />
              </a>

              <div className="relative mt-1.5 flex min-h-4 w-full items-center rounded-sm has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-project-accent 3xl:mt-10">
                <input
                  type="range"
                  min={0}
                  max={duration || 1}
                  step={0.1}
                  value={duration ? currentTime : 0}
                  disabled={!duration}
                  aria-label={`Seek through ${tracks[0].title}`}
                  aria-valuetext={`${formatTime(currentTime)} of ${formatTime(
                    duration,
                  )}`}
                  onChange={(event) => {
                    const audio = audioRef.current;
                    const nextTime = Number(event.currentTarget.value);
                    if (!audio) return;
                    audio.currentTime = nextTime;
                    setCurrentTime(nextTime);
                  }}
                  className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                />
                <div
                  aria-hidden="true"
                  className="relative h-2 w-full rounded-full bg-white/70 dark:bg-white/40"
                >
                  <span
                    className="relative block h-full transition-[width] rounded-full bg-project-accent after:absolute after:-bottom-0.5 after:-right-1 after:z-10 after:size-3 after:rounded-full after:bg-white/90 after:shadow-xs/20 after:backdrop-blur-sm"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 3xl:mt-1">
                <span className="text-[10px] font-medium text-text-muted">
                  {formatTime(currentTime)}
                </span>

                <span className="text-[10px] font-medium text-text-muted">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "00:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}
