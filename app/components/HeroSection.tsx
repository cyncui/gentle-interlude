import { forwardRef } from "react";
import { transitionEaseOut } from "@/app/styles/classNames";

type HeroSectionProps = {
  isCondensed?: boolean;
};

export const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ isCondensed = false }, ref) => {
    const showExpandedElements = !isCondensed;

    return (
      <section
        ref={ref}
        className={`flex flex-col gap-4 max-sm:gap-2 ${transitionEaseOut} ${isCondensed
            ? "w-full max-w-xl items-start text-left"
            : "w-full max-w-2xl items-center text-center"
          }`}
      >
        {showExpandedElements ? (
          <h1
            className={`hidden text-[24px] leading-relaxed sm:block ${transitionEaseOut}`}
          >
            Gentle Interlude Studio
          </h1>
        ) : null}
        {showExpandedElements ? (
          <div className="hidden text-xl text-zinc-500 sm:block">
            ‧˚₊•┈┈┈┈୨୧┈┈┈┈•‧₊˚⊹
          </div>
        ) : null}
        <h2
          className={`text-zinc-700 ${transitionEaseOut} ${isCondensed ? "w-full text-base" : "text-base sm:text-lg"
            }`}
        >
          A versatile early-stage design partner for businesses who want to tell
          a cohesive story. We collaborate with teams at day zero across brand
          and software. <br />
          <br />
          We work in 2 week sprints, ranging from brand identity, MVP launch,
          website design and development, and copywriting. Projects usually range
          from 2-12 weeks (on average).
        </h2>
        <a
          href="mailto:contact@gentleinterlude.studio?subject=Project%20Inquiry"
          className="pointer-events-auto font-arial-narrow text-lg text-zinc-500 bg-zinc-100 px-4 py-2 rounded-md border border-zinc-200 transition-opacity duration-200 hover:opacity-70"
        >
          Get in touch
        </a>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";
