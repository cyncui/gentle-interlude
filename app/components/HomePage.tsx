"use client";

import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { HeroOverlay } from "./HeroOverlay";
import { HeroSection } from "./HeroSection";
import { HomeMain } from "./HomeMain";
import { NotesLayer } from "./NotesLayer";
import { ProjectsSection } from "./ProjectsSection";
import { Footer } from "./Footer";
import { notesWindowData } from "../data/notesWindow.data";
import { projectsData } from "../data/projects.data";

const MOBILE_QUERY = "(max-width: 639px)";
const SCROLL_RANGE = 320;
const NOTES_FADE_MULTIPLIER = 2.6;
const CONDENSED_SCROLL_THRESHOLD = 0.4;
const HERO_LEFT_MARGIN = 32;
const HERO_TOP_MARGIN = 20;
const WINDOW_HALF_SIZE = 150;
const WINDOW_PADDING = 20;

const getRandomOffset = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max - min));

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const cornerOffsetsRef = useRef<Array<{ x: number; y: number }> | null>(
    null,
  );
  const [positions, setPositions] = useState<Array<{ x: number; y: number }>>(
    [],
  );
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroOffset, setHeroOffset] = useState({ x: 0, y: 0 });
  const [isHeroHidden, setIsHeroHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hasProjects = projectsData.length > 0;

  useLayoutEffect(() => {
    const computePositions = () => {
      if (!heroRef.current) {
        return;
      }

      if (!cornerOffsetsRef.current) {
        cornerOffsetsRef.current = Array.from({ length: 4 }, () => ({
          x: getRandomOffset(-20, -4),
          y: getRandomOffset(20, 36),
        }));
      }

      const { innerWidth, innerHeight } = window;
      const offsetX = Math.max(
        0,
        innerWidth / 2 - WINDOW_HALF_SIZE - WINDOW_PADDING,
      );
      const offsetY = Math.max(
        0,
        innerHeight / 2 - WINDOW_HALF_SIZE - WINDOW_PADDING,
      );
      const cornerOffsets = cornerOffsetsRef.current;

      setPositions([
        {
          x: -offsetX - cornerOffsets[0].x,
          y: -offsetY - cornerOffsets[0].y,
        },
        {
          x: offsetX + cornerOffsets[1].x,
          y: -offsetY - cornerOffsets[1].y,
        },
        {
          x: -offsetX - cornerOffsets[2].x,
          y: offsetY + cornerOffsets[2].y,
        },
        {
          x: offsetX + cornerOffsets[3].x,
          y: offsetY + cornerOffsets[3].y,
        },
      ]);
    };

    computePositions();
    window.addEventListener("resize", computePositions);

    return () => {
      window.removeEventListener("resize", computePositions);
    };
  }, []);

  useLayoutEffect(() => {
    const updateHeroOffset = () => {
      if (!heroRef.current) {
        return;
      }

      const heroRect = heroRef.current.getBoundingClientRect();
      const targetX =
        HERO_LEFT_MARGIN - (window.innerWidth / 2 - heroRect.width / 2);
      const targetY =
        HERO_TOP_MARGIN - (window.innerHeight / 2 - heroRect.height / 2);

      setHeroOffset({ x: targetX, y: targetY });
    };

    updateHeroOffset();
    window.addEventListener("resize", updateHeroOffset);

    return () => {
      window.removeEventListener("resize", updateHeroOffset);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / SCROLL_RANGE, 1);
      setScrollProgress(progress);
      if (!heroRef.current || !projectsSectionRef.current) {
        return;
      }
      const heroRect = heroRef.current.getBoundingClientRect();
      const projectsRect =
        projectsSectionRef.current.getBoundingClientRect();
      setIsHeroHidden(projectsRect.top <= heroRect.bottom);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const updateIsMobile = () => {
      setIsMobile(media.matches);
    };
    updateIsMobile();
    media.addEventListener("change", updateIsMobile);

    return () => {
      media.removeEventListener("change", updateIsMobile);
    };
  }, []);

  const heroTranslate = {
    x: heroOffset.x * scrollProgress,
    y: heroOffset.y * scrollProgress,
  };
  const notesOpacity = 1 - Math.min(scrollProgress * NOTES_FADE_MULTIPLIER, 1);
  const isCondensedHero =
    isMobile || scrollProgress > CONDENSED_SCROLL_THRESHOLD;
  const isHeroVisible = !isHeroHidden;
  const mobileHero = isMobile ? (
    <div className="px-6 pt-8">
      <HeroSection ref={heroRef} isCondensed />
    </div>
  ) : null;

  return (
    <div className={`relative min-h-screen overflow-x-hidden ${!hasProjects ? "h-screen overflow-hidden" : ""}`}>
      {!isMobile ? (
        <HeroOverlay
          heroRef={heroRef as RefObject<HTMLDivElement>}
          heroTranslate={heroTranslate}
          isCondensed={isCondensedHero}
          isHeroVisible={isHeroVisible}
        />
      ) : null}

      <HomeMain
        notesLayer={
          <NotesLayer
            notes={notesWindowData}
            notesOpacity={notesOpacity}
            positions={positions}
            heroRef={heroRef as RefObject<HTMLDivElement>}
          />
        }
        projectsSection={
          <>
            {mobileHero}
            <ProjectsSection
              projects={projectsData}
              sectionRef={projectsSectionRef}
            />
          </>
        }
      />

      {isCondensedHero ? (
        <Footer email="contact@gentleinterlude.studio" />
      ) : null}
    </div>
  );
}
