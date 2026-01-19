import type { RefObject } from "react";

export type NotesWindowProps = {
  text: string;
  windowTitle: string;
  avoidRef?: RefObject<HTMLElement | null>;
  initialPosition?: { x: number; y: number };
};
