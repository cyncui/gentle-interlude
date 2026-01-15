import type { RefObject } from "react";
import { NotesWindow } from "./NotesWindow";
import type { NotesWindowProps } from "../data/notesWindow.types";

type NotesLayerProps = {
  notes: Array<
    Pick<NotesWindowProps, "windowTitle" | "title" | "text" | "initialPosition">
  >;
  notesOpacity: number;
  positions: Array<{ x: number; y: number }>;
  heroRef: RefObject<HTMLDivElement>;
  onOpenChange: (isOpen: boolean) => void;
};

export function NotesLayer({
  notes,
  notesOpacity,
  positions,
  heroRef,
  onOpenChange,
}: NotesLayerProps) {
  return (
    <div
      className="relative min-h-screen transition-opacity duration-300 ease-out"
      style={{
        opacity: notesOpacity,
        pointerEvents: notesOpacity < 0.05 ? "none" : "auto",
      }}
    >
      {notes.map((note, index) => (
        <NotesWindow
          key={note.title}
          {...note}
          avoidRef={heroRef}
          initialPosition={positions[index % positions.length]}
          onOpenChange={onOpenChange}
        />
      ))}
    </div>
  );
}
