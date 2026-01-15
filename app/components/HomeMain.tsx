import type { ReactNode } from "react";

type HomeMainProps = {
  openNotesCount: number;
  notesLayer: ReactNode;
  projectsSection: ReactNode;
};

export function HomeMain({
  openNotesCount,
  notesLayer,
  projectsSection,
}: HomeMainProps) {
  return (
    <main className={`relative w-full ${openNotesCount > 0 ? "z-50" : "z-10"}`}>
      {notesLayer}
      {projectsSection}
    </main>
  );
}
