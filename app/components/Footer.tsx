import { fontArialNarrow, textZinc500 } from "@/app/styles/classNames";

type FooterProps = {
  email: string;
};

export const Footer = ({ email }: FooterProps) => {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`${fontArialNarrow} fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between overflow-hidden border-t border-zinc-200 bg-[#fbfbfb] px-[20px] py-4 text-base ${textZinc500}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
        }}
      />
      <a
        className="relative transition-opacity duration-200 hover:opacity-70"
        href={`mailto:${email}`}
      >
        {email}
      </a>
      <span className="relative">© {year}</span>
    </footer>
  );
};
