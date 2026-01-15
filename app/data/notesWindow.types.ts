import type { RefObject } from "react";

export type NotesWindowProps = {
  title: string;
  text: string;
  windowTitle: string;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  dragConstraints?: RefObject<Element | null>;
  avoidRef?: RefObject<HTMLElement | null>;
  initialPosition?: { x: number; y: number };
};
