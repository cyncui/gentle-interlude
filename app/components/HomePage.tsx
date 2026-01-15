"use client";

import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { HeroOverlay } from "./HeroOverlay";
import { HomeMain } from "./HomeMain";
import { NotesLayer } from "./NotesLayer";
import { ProjectsSection } from "./ProjectsSection";
import { Footer } from "./Footer";
import { notesWindowData } from "../data/notesWindow.data";
import { projectsData } from "../data/projects.data";

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
  const [openNotesCount, setOpenNotesCount] = useState(0);

  useLayoutEffect(() => {
    const computePositions = () => {
      if (!heroRef.current) {
        return;
      }

      if (!cornerOffsetsRef.current) {
        const randomOffsetX = () => Math.floor(-20 + Math.random() * 16);
        const randomOffsetY = () => Math.floor(20 + Math.random() * 16);
        cornerOffsetsRef.current = [
          { x: randomOffsetX(), y: randomOffsetY() },
          { x: randomOffsetX(), y: randomOffsetY() },
          { x: randomOffsetX(), y: randomOffsetY() },
          { x: randomOffsetX(), y: randomOffsetY() },
        ];
      }

      const { innerWidth, innerHeight } = window;
      const halfWindowSize = 150;
      const padding = 20;
      const offsetX = Math.max(0, innerWidth / 2 - halfWindowSize - padding);
      const offsetY = Math.max(0, innerHeight / 2 - halfWindowSize - padding);
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
      const leftMargin = 32;
      const topMargin = 20;
      const targetX = leftMargin - (window.innerWidth / 2 - heroRect.width / 2);
      const targetY =
        topMargin - (window.innerHeight / 2 - heroRect.height / 2);

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
      const progress = Math.min(window.scrollY / 320, 1);
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

  const heroTranslate = {
    x: heroOffset.x * scrollProgress,
    y: heroOffset.y * scrollProgress,
  };
  const notesOpacity = 1 - Math.min(scrollProgress * 2.6, 1);
  const isCondensedHero = scrollProgress > 0.4;
  const isHeroVisible = !isHeroHidden;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <HeroOverlay
        heroRef={heroRef as RefObject<HTMLDivElement>}
        heroTranslate={heroTranslate}
        isCondensed={isCondensedHero}
        isHeroVisible={isHeroVisible}
      />

      <HomeMain
        openNotesCount={openNotesCount}
        notesLayer={
          <NotesLayer
            notes={notesWindowData}
            notesOpacity={notesOpacity}
            positions={positions}
            heroRef={heroRef as RefObject<HTMLDivElement>}
            onOpenChange={(isOpen) => {
              setOpenNotesCount((count) =>
                Math.max(0, count + (isOpen ? 1 : -1)),
              );
            }}
          />
        }
        projectsSection={
          <ProjectsSection
            projects={projectsData}
            sectionRef={projectsSectionRef}
          />
        }
      />

      {isCondensedHero ? (
        <Footer email="contact@gentleinterlude.studio" />
      ) : null}
    </div>
  );
}
