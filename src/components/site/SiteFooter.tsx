import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

const footerLinkLabelClass =
  "underline-offset-2 group-hover:underline group-focus-visible:underline";
const footerLinkArrowClass =
  "size-3 transition-transform duration-150 group-hover:-translate-y-px group-hover:translate-x-px group-focus-visible:-translate-y-px group-focus-visible:translate-x-px";

export default function SiteFooter() {
  return (
    <footer className="border-t-[0.5px] border-border-subtle px-page-padding">
      <div className="sm:hidden">
        <div className="py-6 text-xs">
          <div className="flex flex-col gap-0.5">
            <span className="font-bold">Filippo Piggici</span>
            <span className="text-text-muted">Frontend Engineer</span>
          </div>
        </div>

        <nav className="border-t-[0.5px] border-border-subtle">
          <ul className="text-xs tracking-tight">
            <li className="border-b-[0.5px] border-border-subtle">
              <Link
                href="https://github.com/filpgc"
                target="_blank"
                rel="noreferrer"
                className="flex min-h-12 items-center justify-between"
              >
                <span>GitHub</span>
                <span className="sr-only"> opens in a new tab</span>
                <ArrowTopRightIcon aria-hidden="true" className="size-3.5" />
              </Link>
            </li>
            <li className="border-b-[0.5px] border-border-subtle">
              <Link
                href="https://www.linkedin.com/in/filippopiggici"
                target="_blank"
                rel="noreferrer"
                className="flex min-h-12 items-center justify-between"
              >
                <span>LinkedIn</span>
                <span className="sr-only"> opens in a new tab</span>
                <ArrowTopRightIcon aria-hidden="true" className="size-3.5" />
              </Link>
            </li>
            <li>
              <Link
                href="mailto:filippo.piggici@gmail.com"
                className="flex min-h-12 items-center justify-between"
              >
                <span>Email</span>
                <ArrowTopRightIcon aria-hidden="true" className="size-3.5" />
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex justify-between border-t-[0.5px] border-border-subtle py-4 text-[10px] font-medium text-text-primary/70">
          <span>© {new Date().getFullYear()} Filippo Piggici</span>
          <span>Next.js · Tailwind · Cloudflare</span>
        </div>
      </div>

      <div className="hidden h-full grid-cols-3 justify-between gap-8 sm:grid">
        <div className="flex flex-col gap-0.5 py-8 text-xs">
          <span className="font-bold">Filippo Piggici</span>
          <span className="text-text-muted">Frontend Engineer</span>
        </div>

        <span className="mt-auto justify-self-center rounded-t-[50px] border-[0.5px] border-b-0 border-border-subtle bg-surface/80 px-3.5 pb-0.5 pt-1 text-[10px] font-medium text-text-primary/70">
          Built with <span className="font-semibold text-text-primary/80">Next.js</span>,{" "}
          <span className="font-semibold text-text-primary/80">Tailwind</span> and{" "}
          <span className="font-semibold text-text-primary/80">Cloudflare</span>
        </span>

        <nav className="ml-auto pt-5">
          <ul className="flex items-center gap-x-6 text-xs tracking-tight">
            <li>
              <Link
                href="https://github.com/filpgc"
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-11 items-center gap-1"
              >
                <span className={footerLinkLabelClass}>GitHub</span>
                <span className="sr-only"> opens in a new tab</span>
                <ArrowTopRightIcon
                  aria-hidden="true"
                  className={footerLinkArrowClass}
                />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/filippopiggici"
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-11 items-center gap-1"
              >
                <span className={footerLinkLabelClass}>LinkedIn</span>
                <span className="sr-only"> opens in a new tab</span>
                <ArrowTopRightIcon
                  aria-hidden="true"
                  className={footerLinkArrowClass}
                />
              </Link>
            </li>
            <li>
              <Link
                href="mailto:filippo.piggici@gmail.com"
                className="group flex min-h-11 items-center gap-1"
              >
                <span className={footerLinkLabelClass}>Email</span>
                <ArrowTopRightIcon
                  aria-hidden="true"
                  className={footerLinkArrowClass}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
