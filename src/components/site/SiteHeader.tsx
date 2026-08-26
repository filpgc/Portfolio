"use client";

import avatar from "@/assets/avatar.png";
import { usePathname } from "next/navigation";
import {
  CodeSandboxLogoIcon,
  CookieIcon,
  KeyboardIcon,
  TokensIcon,
} from "@radix-ui/react-icons";
import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ContactPopover from "./ContactPopover";
import ThemeToggle from "./ThemeToggle";

const navLinkClass =
  "group flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 py-0.5 leading-none transition-[background-color,transform] duration-150 hover:bg-control-hover active:scale-97";

export default function SiteHeader() {
  const pathName = usePathname();

  const [isAvatarRolling, setIsAvatarRolling] = useState(false);

  return (
    <header className="group/site-header px-page-padding border-b-[0.5px] border-border-subtle">
      <nav className="grid min-h-16 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 text-[13px] sm:min-h-0">
        <Link
          href="/#home"
          onClick={() => setIsAvatarRolling(true)}
          onAnimationEnd={() => setIsAvatarRolling(false)}
          className={cx(
            "group relative z-20 my-auto size-11 justify-self-start rounded-full transition-transform duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-project-accent sm:size-12",
            isAvatarRolling && "avatar-wheel",
          )}
          aria-label="Filippo Piggici, Home"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full outline-[0.5px] outline-offset-0 outline-transparent transition-[outline-color,outline-offset] group-hover:outline-offset-10 group-hover:outline-border-subtle group-focus-visible:outline-border-subtle sm:group-hover:outline-offset-24"
          />
          <span className="absolute inset-0 overflow-hidden rounded-full border-[0.5px] border-border-subtle bg-text-primary/20 transition-[border-color,box-shadow] duration-200 group-hover:border-text-primary/60 group-hover:shadow-sm/10">
            <Image
              alt="Filippo Piggici"
              src={avatar}
              fill
              title="Easter egg"
              className="scale-135 object-contain object-bottom pt-2"
            />
          </span>
        </Link>
        <ul className="flex justify-self-center gap-1 py-2 sm:gap-5 sm:py-6.5 lg:gap-10">
          <li>
            <Link
              href="/#work"
              onClick={() => document.getElementById("work")?.scrollIntoView()}
              className={navLinkClass}
              aria-label="Work"
            >
              <KeyboardIcon className="size-4 -translate-y-px transition-transform duration-200 group-hover:scale-105" />
              <span className="hidden sm:inline">Work</span>
            </Link>
          </li>
          <li>
            <Link
              href="/#experience"
              onClick={() =>
                document.getElementById("experience")?.scrollIntoView()
              }
              className={navLinkClass}
              aria-label="Experience"
            >
              <CodeSandboxLogoIcon className="size-4 -translate-y-px transition-transform duration-200 group-hover:scale-105" />
              <span className="hidden sm:inline">Experience</span>
            </Link>
          </li>
          <li className="max-[380px]:hidden">
            <Link
              href="/foundations"
              className={cx(navLinkClass, {
                "bg-control-hover pointer-events-none":
                  pathName.startsWith("/foundations"),
              })}
              aria-label="System"
            >
              <TokensIcon className="size-4 -translate-y-px transition-transform duration-200 group-hover:scale-105" />
              <span className="hidden sm:inline">System</span>
            </Link>
          </li>
          <li>
            <Link
              href="/#music"
              onClick={() => document.getElementById("music")?.scrollIntoView()}
              className={navLinkClass}
              aria-label="Music"
            >
              <CookieIcon className="size-4 -translate-y-px transition-transform duration-200 group-hover:scale-105" />
              <span className="hidden sm:inline">Music</span>
            </Link>
          </li>
        </ul>
        <div className="contents sm:flex sm:min-w-0 sm:items-center sm:justify-self-end">
          <ThemeToggle className="justify-self-end sm:mr-0.5 sm:justify-self-auto" />
          <ContactPopover />
        </div>
      </nav>
    </header>
  );
}
