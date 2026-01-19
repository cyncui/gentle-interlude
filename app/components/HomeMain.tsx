import type { ReactNode } from "react";

type HomeMainProps = {
  notesLayer: ReactNode;
  projectsSection: ReactNode;
};

export function HomeMain({
  notesLayer,
  projectsSection,
}: HomeMainProps) {
  return (
    <main className="relative w-full">
      {notesLayer}
      {projectsSection}
    </main>
  );
}
