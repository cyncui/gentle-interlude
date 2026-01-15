import type { RefObject } from "react";
import { HeroSection } from "./HeroSection";
import { transitionEaseOut } from "../styles/classNames";

type HeroOverlayProps = {
  heroRef: RefObject<HTMLDivElement>;
  heroTranslate: { x: number; y: number };
  isCondensed: boolean;
  isHeroVisible: boolean;
};

export function HeroOverlay({
  heroRef,
  heroTranslate,
  isCondensed,
  isHeroVisible,
}: HeroOverlayProps) {
  return (
    <div
      className={`pointer-events-none fixed left-1/2 top-1/2 z-30 ${transitionEaseOut} ${
        isHeroVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform: `translate(calc(-50% + ${heroTranslate.x}px), calc(${
          isCondensed ? "-80%" : "-50%"
        } + ${heroTranslate.y}px))`,
      }}
    >
      <div className="origin-top-left transition-transform duration-300 ease-out">
        <HeroSection ref={heroRef} isCondensed={isCondensed} />
      </div>
    </div>
  );
}
