"use client";

import { useRef, type PointerEvent } from "react";

const DISTANCE = 20;
const REST = { opacity: 1, transform: "translate3d(0, 0, 0)" };

function getEdgeTransform(event: PointerEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - bounds.left - bounds.width / 2) / bounds.width;
  const y = (event.clientY - bounds.top - bounds.height / 2) / bounds.height;
  const horizontal = Math.abs(x) > Math.abs(y);

  return `translate3d(${horizontal ? Math.sign(x) * DISTANCE : 0}px, ${horizontal ? 0 : Math.sign(y) * DISTANCE}px, 0)`;
}

export function useDirectionalReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const animationRef = useRef<Animation>(null);

  function animate(event: PointerEvent<HTMLElement>, entering: boolean) {
    if (
      !ref.current ||
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const edge = {
      opacity: 0,
      transform: getEdgeTransform(event),
    };

    animationRef.current?.cancel();
    animationRef.current = ref.current.animate(
      entering ? [edge, REST] : [REST, edge],
      {
        duration: entering ? 300 : 180,
        easing: entering
          ? "cubic-bezier(0.22, 1, 0.36, 1)"
          : "cubic-bezier(0.4, 0, 1, 1)",
      },
    );
  }

  return {
    ref,
    onPointerEnter: (event: PointerEvent<HTMLElement>) => animate(event, true),
    onPointerLeave: (event: PointerEvent<HTMLElement>) => animate(event, false),
  };
}
