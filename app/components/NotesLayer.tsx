import type { RefObject } from "react";
import { NotesWindow } from "./NotesWindow";
import type { NotesWindowProps } from "../data/notesWindow.types";

type NotesLayerProps = {
  notes: Array<
    Pick<NotesWindowProps, "windowTitle" | "text" | "initialPosition">
  >;
  notesOpacity: number;
  positions: Array<{ x: number; y: number }>;
  heroRef: RefObject<HTMLDivElement>;
};

export function NotesLayer({
  notes,
  notesOpacity,
  positions,
  heroRef,
}: NotesLayerProps) {
  const isInteractive = notesOpacity >= 0.05;

  return (
    <div
      className="relative min-h-0 transition-opacity duration-300 ease-out md:min-h-screen"
      style={{
        opacity: notesOpacity,
        pointerEvents: isInteractive ? "auto" : "none",
      }}
    >
      {notes.map((note, index) => (
        <NotesWindow
          key={note.windowTitle}
          {...note}
          avoidRef={heroRef}
          initialPosition={positions[index % positions.length]}
        />
      ))}
    </div>
  );
}
