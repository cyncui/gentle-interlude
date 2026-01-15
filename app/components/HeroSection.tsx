import { forwardRef } from "react";
import { transitionEaseOut } from "@/app/styles/classNames";

type HeroSectionProps = {
  isCondensed?: boolean;
};

export const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ isCondensed = false }, ref) => (
    <section
      ref={ref}
      className={`flex max-w-2xl flex-col gap-4 ${transitionEaseOut} ${
        isCondensed ? "items-start text-left" : "items-center text-center"
      }`}
    >
      {!isCondensed ? (
        <h1 className={`text-[28px] ${transitionEaseOut}`}>
          Gentle Interlude Studio
        </h1>
      ) : null}
      {!isCondensed ? (
        <div className="text-xl text-zinc-500">‧˚₊•┈┈┈┈୨୧┈┈┈┈•‧₊˚⊹</div>
      ) : null}
      <h2
        className={`text-zinc-700 ${transitionEaseOut} ${
          isCondensed ? "text-base" : "text-lg"
        }`}
      >
        A versatile early-stage design partner for businesses who want to tell a
        cohesive story. We collaborate with teams at day zero across brand and
        software. <br />
        <br />We work in 2 week sprints, ranging from brand identity, marketing,
        MVP launch, website design and development, and copywriting. Projects
        usually range from 2-12 weeks (on average).
      </h2>
    </section>
  )
);

HeroSection.displayName = "HeroSection";
