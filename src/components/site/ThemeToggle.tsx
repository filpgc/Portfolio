"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import cx from "classnames";

type Theme = "light" | "dark";

export default function ThemeToggle({ className }: { className?: string }) {
  function toggleTheme() {
    const nextTheme: Theme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle colour theme"
      className={cx(
        "group grid size-11 place-items-center rounded-full transition-[background-color,transform] duration-150 hover:bg-text-primary/6 active:scale-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-project-accent",
        className,
      )}
    >
      <MoonIcon className="size-4 dark:hidden group-hover:scale-105 transition-transform" />
      <SunIcon className="hidden size-4 dark:block group-hover:scale-105 transition-transform" />
    </button>
  );
}
