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
      className={`pointer-events-none fixed z-30 ${transitionEaseOut} ${
        isHeroVisible ? "opacity-100" : "opacity-0"
      } ${isCondensed ? "left-0 top-0 w-full px-6 pt-8" : "left-1/2 top-1/2"}`}
      style={{
        transform: isCondensed
          ? "none"
          : `translate(calc(-50% + ${heroTranslate.x}px), calc(-50% + ${heroTranslate.y}px))`,
      }}
    >
      <div className="origin-top-left transition-transform duration-300 ease-out">
        <HeroSection ref={heroRef} isCondensed={isCondensed} />
      </div>
    </div>
  );
}
