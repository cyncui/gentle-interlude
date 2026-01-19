"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "motion/react";
import type { NotesWindowProps } from "../data/notesWindow.types";
import {
  borderZinc200,
  fontArialNarrow,
  textZinc500,
} from "@/app/styles/classNames";

export function NotesWindow({
  text,
  windowTitle,
  avoidRef,
  initialPosition,
}: NotesWindowProps) {
  const draggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const x = useMotionValue(initialPosition?.x ?? 0);
  const y = useMotionValue(initialPosition?.y ?? 0);

  useEffect(() => {
    if (hasDraggedRef.current || !initialPosition) {
      return;
    }
    x.set(initialPosition.x);
    y.set(initialPosition.y);
  }, [initialPosition, x, y]);

  useEffect(() => {
    clickAudioRef.current = new Audio("/sound/click.mp3");
    clickAudioRef.current.preload = "auto";

    return () => {
      clickAudioRef.current = null;
    };
  }, []);

  const playClick = () => {
    const audio = clickAudioRef.current;
    if (!audio) {
      return;
    }
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const handleClick = () => {
    if (draggingRef.current) {
      draggingRef.current = false;
      return;
    }
    playClick();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      playClick();
    }
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      draggingRef.current = false;
    }, 0);

    if (!avoidRef?.current || !windowRef.current) {
      return;
    }

    const windowRect = windowRef.current.getBoundingClientRect();
    const avoidRect = avoidRef.current.getBoundingClientRect();
    const overlapX =
      Math.min(windowRect.right, avoidRect.right) -
      Math.max(windowRect.left, avoidRect.left);
    const overlapY =
      Math.min(windowRect.bottom, avoidRect.bottom) -
      Math.max(windowRect.top, avoidRect.top);

    if (overlapX <= 0 || overlapY <= 0) {
      return;
    }

    const padding = 16;
    const windowCenterX = (windowRect.left + windowRect.right) / 2;
    const windowCenterY = (windowRect.top + windowRect.bottom) / 2;
    const avoidCenterX = (avoidRect.left + avoidRect.right) / 2;
    const avoidCenterY = (avoidRect.top + avoidRect.bottom) / 2;
    let deltaX = 0;
    let deltaY = 0;

    if (overlapX < overlapY) {
      deltaX =
        windowCenterX < avoidCenterX
          ? -(overlapX + padding)
          : overlapX + padding;
    } else {
      deltaY =
        windowCenterY < avoidCenterY
          ? -(overlapY + padding)
          : overlapY + padding;
    }

    if (deltaX !== 0) {
      x.set(x.get() + deltaX);
    }
    if (deltaY !== 0) {
      y.set(y.get() + deltaY);
    }
  };

  return (
    <motion.div
      ref={windowRef}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      drag
      dragElastic={0.15}
      dragMomentum={false}
      onDragStart={() => {
        draggingRef.current = true;
        hasDraggedRef.current = true;
      }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.99 }}
      className={`absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 select-none rounded-xl ${borderZinc200} bg-[#fbfbfb] shadow-[0_18px_40px_-30px_rgba(0,0,0,0.45)] md:block`}
      style={{ width: 300, height: 250, x, y }}
    >
      <div className="flex h-9 items-center gap-2 rounded-t-xl border-b border-zinc-200 bg-linear-to-b from-white/80 to-white/40 px-3">
        <span
          className={`ml-2 text-xs font-medium ${textZinc500} ${fontArialNarrow} uppercase`}
        >
          {windowTitle}
        </span>
      </div>
      <div className="flex h-[calc(100%-36px)] flex-col gap-2 p-4">
        <p className="text-zinc-700">{text}</p>
      </div>
    </motion.div>
  );
}
