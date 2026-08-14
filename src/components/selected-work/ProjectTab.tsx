import type { Project } from "@/content/project";
import cx from "classnames";
import type { KeyboardEvent } from "react";

export type TabOrientation = "horizontal" | "vertical";

type ProjectTabProps = {
  orientation: TabOrientation;
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
};

export default function ProjectTab({
  orientation,
  project,
  isSelected,
  onSelect,
  onKeyDown,
}: ProjectTabProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <button
      id={`${orientation}-project-tab-${project.number}`}
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={`${orientation}-project-preview`}
      tabIndex={isSelected ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={cx(
        "relative flex min-h-20 text-left transition-colors",
        isHorizontal
          ? "min-w-0 flex-col justify-between gap-2 px-3 py-3 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:origin-left after:bg-project-accent after:transition-transform"
          : "w-full items-center gap-10 py-8 pl-2 pr-6",
        isHorizontal &&
          (isSelected
            ? "bg-text-primary/[0.035] after:scale-x-100"
            : "text-text-muted after:scale-x-0 hover:bg-text-primary/[0.025]"),
      )}
    >
      <span
        className={cx(
          "tabular-nums text-text-muted",
          isHorizontal ? "text-[10px]" : "self-start pt-1 text-xs",
        )}
      >
        {project.number}
      </span>

      <span
        className={cx(
          "min-w-0 transition-transform duration-200",
          isHorizontal
            ? "truncate text-[13px] font-semibold leading-none"
            : "flex flex-1 flex-col gap-2",
          !isHorizontal && isSelected && "lg:translate-x-3",
          !isHorizontal && !isSelected && "lg:group-hover:translate-x-3",
          isHorizontal && isSelected && "text-project-accent",
        )}
      >
        {isHorizontal ? (
          project.shortName
        ) : (
          <>
            <span
              className={cx(
                "text-2xl font-semibold leading-tight transition-colors duration-200",
                isSelected && "text-project-accent",
              )}
            >
              {project.name}
            </span>
            <span className="text-xs text-text-muted">{project.category}</span>
          </>
        )}
      </span>

      {!isHorizontal && (
        <span className="ml-auto self-start pt-1 text-right text-xs text-text-muted">
          {project.period}
        </span>
      )}
    </button>
  );
}
