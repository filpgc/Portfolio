"use client";

import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { Fragment, useEffect, useRef, useState } from "react";
import cx from "classnames";

const sentence = "I build product interfaces and the systems behind them";
const sentenceWords = sentence.split(" ");

type Segment = (typeof audioIntroSegments)[number];
const audioIntroSegments = [
  { id: "I'm", start: 0.2, end: 0.8 },
  { id: "build", start: 1.1, end: 1.5 },
  { id: "product", start: 1.5, end: 2.05 },
  { id: "interfaces", start: 2.05, end: 2.85 },
  { id: "systems", start: 3.15, end: 3.75 },
  { id: "them", start: 3.9, end: 4.3 },
] as const;

export default function HeroSoundSketch() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [activeSegment, setActiveSegment] = useState<Segment>();

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      setHasFinished(false);
      audio.play();
      setIsPlaying(true);
      return;
    }
    audio.pause();
    setIsPlaying(false);
  }

  useEffect(() => {
    if (!isPlaying) return;

    let frameId: number;

    function syncAudioOnAnimationFrame() {
      const audio = audioRef.current;
      if (!audio) return;

      setActiveSegment(
        audioIntroSegments.find(
          (segment) =>
            audio.currentTime >= segment.start &&
            audio.currentTime < segment.end,
        ),
      );

      frameId = requestAnimationFrame(syncAudioOnAnimationFrame);
    }

    frameId = requestAnimationFrame(syncAudioOnAnimationFrame);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isPlaying]);

  return (
    <div className="mt-4 sm:mt-10">
      <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
        Filippo Piggici · Frontend & Design engineer
      </span>

      <div className="mt-8 sm:mt-15">
        <h1
          id="home-title"
          className="max-w-[15ch] text-[clamp(3rem,12vw,7.6rem)] font-medium leading-[0.92] tracking-[-0.065em] 3xl:text-[clamp(7.6rem,7vw,9rem)]"
        >
          I’m{" "}
          <button
            type="button"
            onClick={togglePlayback}
            className="group/voice inline-flex items-baseline text-project-accent transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-[0.06em] focus-visible:outline-project-accent active:scale-[0.985] active:duration-75"
          >
            <span>Filippo</span>
            <span
              aria-hidden="true"
              className="ml-[5px] inline-grid size-[0.18em] translate-y-[-0.01em] place-items-center self-baseline"
            >
              <span className="grid size-full animate-[motion-attention-scale_700ms_cubic-bezier(0.22,1,0.36,1)_1s_1_both] place-items-center rounded-full bg-project-accent text-on-project-accent transition-transform duration-200 ease-out group-hover/voice:scale-110 group-focus-visible/voice:scale-110">
                {isPlaying ? (
                  <PauseIcon className="size-[42%]" />
                ) : (
                  <PlayIcon className="size-[42%]" />
                )}
              </span>
            </span>
          </button>{" "}
          {sentenceWords.map((word, index) => (
            <Fragment key={word}>
              <span
                className={cx(
                  "inline-block origin-bottom transition-[color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  activeSegment?.id === word &&
                    "scale-[1.01] text-project-accent duration-150",
                )}
              >
                {word}
              </span>
              {index < sentenceWords.length - 1 ? " " : ""}
            </Fragment>
          ))}
          <span
            className={cx(
              "inline-block origin-bottom",
              hasFinished &&
                "animate-[motion-pulse-settle_420ms_cubic-bezier(0.22,1,0.36,1)]",
            )}
          >
            .
          </span>
        </h1>
      </div>

      <audio
        ref={audioRef}
        preload="metadata"
        src="/audio/intro.m4a"
        onEnded={() => {
          setIsPlaying(false);
          setActiveSegment(undefined);
          setHasFinished(true);
        }}
      />
    </div>
  );
}
