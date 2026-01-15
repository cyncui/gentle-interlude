import type { NotesWindowProps } from "./notesWindow.types";

export const notesWindowData: Array<
  Pick<NotesWindowProps, "windowTitle" | "title" | "text" | "initialPosition">
> = [
  {
    windowTitle: "Services",
    title: "What we'll do",
    text: "We offer a range of services, from brand identity to website design and development, and copywriting. If you need a CMS set up, we can do that too. We'll start with a discovery call to understand your needs and goals for the project.",
    initialPosition: { x: -540, y: -320 },
  },
  {
    windowTitle: "About",
    title: "Who we are",
    text: "We are a small team of (2!) designers, developers, marketers, and writers. We have experience working for a variety of clients across many industries.",
    initialPosition: { x: 220, y: -330 },
  },
  {
    windowTitle: "Pricing",
    title: "What we'll charge",
    text: "A single page website and brand identity starts at $2k/week, and goes up from there, depending on scope.",
    initialPosition: { x: -520, y: 230 },
  },
  {
    windowTitle: "Philosophy",
    title: "How we work",
    text: "We always deliver on what was promised. When people believe in us, we play a part in shaping their tomorrows. We never let our bar for quality fall, and this means upholding our standards even when it might not be noticed by others. Quality first.",
    initialPosition: { x: 240, y: 240 },
  },
];
