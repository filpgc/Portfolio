import { experiences } from "@/content/experience";
import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";
import cx from "classnames";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mb-16 scroll-mt-4 sm:mb-24 sm:scroll-mt-10"
    >
      <SectionHeader
        id="experience-title"
        title="Experience"
        description="How my scope grew from owning product delivery to shaping frontend direction."
      >
        <CodeSandboxLogoIcon className="size-4" />
      </SectionHeader>
      <div className="mt-8 grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-8">
        {experiences.map((e) => (
          <article
            className={cx(
              "flex h-full flex-col bg-surface p-5 sm:p-6",
              e.featured && "lg:col-span-2",
            )}
            key={e.company}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-text-muted">{e.period}</span>

              <span className="text-xs text-text-muted">/ {e.areas} /</span>
            </div>

            <div
              className={cx(
                "flex flex-1 flex-col",
                e.featured &&
                  "lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(28rem,1.1fr)] lg:gap-16",
              )}
            >
              <div className="flex flex-col">
                <h3
                  className={cx(
                    "mt-10 font-medium leading-none tracking-tighter sm:mt-8",
                    e.featured
                      ? "text-[clamp(2.8rem,13vw,5.5rem)] sm:text-[clamp(3.5rem,8vw,5.5rem)] lg:text-[clamp(4.5rem,7vw,6.5rem)]"
                      : "text-[clamp(2.8rem,12vw,4.25rem)] sm:text-[clamp(3rem,7vw,4.25rem)] lg:text-[clamp(2.8rem,3.6vw,3.8rem)]",
                    e.tone === "accent"
                      ? "text-experience-accent-surface"
                      : "text-text-primary",
                  )}
                >
                  {e.company}
                </h3>
                <span
                  className={cx(
                    "mt-1 block text-sm font-medium sm:text-base",
                    e.tone === "accent"
                      ? "text-experience-accent-text"
                      : "text-text-primary",
                  )}
                >
                  {e.progression ?? e.role}
                </span>

                <p
                  className={cx(
                    "my-5 max-w-[70ch] text-pretty text-sm leading-5 text-text-muted lg:text-[0.8rem] lg:leading-[1.5]",
                    e.featured ? "lg:mb-0" : "lg:min-h-28",
                  )}
                >
                  {e.summary}
                </p>
              </div>

              <div
                className={cx(
                  "mt-auto border-t-[0.5px] border-border-subtle",
                  e.featured && "lg:mt-8 lg:self-end",
                )}
              >
                {e.technologies.map((tech) => (
                  <div
                    className="grid grid-cols-[72px_1fr] items-start border-border-subtle py-3 not-last:border-b-[0.5px] sm:grid-cols-[90px_1fr] sm:items-center"
                    key={tech.label}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      {tech.label}
                    </span>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs sm:gap-x-4">
                      {tech.items.map((i) => (
                        <span key={i}>{i}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
