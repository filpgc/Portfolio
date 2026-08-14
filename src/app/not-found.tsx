import { ArrowTopLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="flex flex-1 flex-col justify-between py-8 sm:py-12"
    >
      <div className="flex items-center justify-between border-b-[0.5px] border-border-strong pb-3 text-xs font-bold uppercase tracking-widest">
        <span>404</span>
        <span className="text-text-muted">Page not found</span>
      </div>

      <div className="py-20 sm:py-28">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-project-accent">
          Wrong turn
        </p>
        <h1
          id="not-found-title"
          className="max-w-[9ch] text-[clamp(3.75rem,14vw,8rem)] font-medium leading-[0.88] tracking-[-0.065em]"
        >
          Nothing lives here.
        </h1>
      </div>

      <Link
        href="/"
        className="flex min-h-12 items-center justify-between border-t-[0.5px] border-border-strong pt-3 text-sm font-bold"
      >
        Back to the portfolio
        <ArrowTopLeftIcon aria-hidden="true" className="size-3.5" />
      </Link>
    </section>
  );
}
