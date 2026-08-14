import type { ReactNode } from "react";

export default function SectionHeader({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <header className="grid w-full grid-cols-[2rem_1fr] gap-x-3 gap-y-2 border-b-[0.5px] border-border-strong pb-4 md:grid-cols-[45px_.45fr_1fr] md:gap-8">
      <span
        className="flex size-6 items-center justify-start opacity-85"
        aria-hidden="true"
      >
        {children}
      </span>
      <h2 id={id} className="font-bold">
        {title}
      </h2>
      <p className="col-start-2 max-w-[52ch] text-sm leading-5 md:col-start-auto md:ml-auto md:text-right">
        {description}
      </p>
    </header>
  );
}
