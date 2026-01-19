import Image from "next/image";
import type { Project } from "@/app/data/projects.types";
import {
  fontArialNarrow,
  projectImageFrame,
  textZinc500,
} from "@/app/styles/classNames";

type ProjectsSectionProps = {
  projects: Project[];
  sectionRef?: React.RefObject<HTMLElement | null>;
};

export function ProjectsSection({
  projects,
  sectionRef,
}: ProjectsSectionProps) {
  const headerRowClassName = `${fontArialNarrow} grid grid-cols-6 gap-4 text-sm ${textZinc500}`;
  const imageCellClassName = "col-span-3 sm:col-span-2 lg:col-span-1";

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-full px-6 pb-24 pt-8"
    >
      <div className="space-y-20">
        {projects.map((project) => (
          <article key={project.id} className="space-y-4">
            <div className={headerRowClassName}>
              <div className="col-start-1 col-span-1 max-sm:col-span-2 text-zinc-900">
                {project.title}
              </div>
              <div className="col-start-2 col-span-2 max-sm:hidden">
                {project.description}
              </div>
              <div className="col-start-4 col-span-3">{project.services}</div>
            </div>

            <div className="grid grid-cols-6 gap-4">
              {project.images.map((image, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className={imageCellClassName}
                >
                  {image.src ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={420}
                      height={315}
                      className={`${projectImageFrame} object-cover`}
                    />
                  ) : (
                    <div className={`${projectImageFrame} bg-zinc-100/80`} />
                  )}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
