import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import cx from "classnames";

export const metadata: Metadata = {
  title: "Foundations",
  description:
    "The design foundations behind Filippo Piggici’s portfolio: colour, typography, spacing and responsive layout.",
};

const colourTokens = [
  {
    name: "Canvas",
    token: "--color-canvas",
    utility: "bg-canvas",
    className: "bg-canvas text-text-primary",
  },
  {
    name: "Surface",
    token: "--color-surface",
    utility: "bg-surface",
    className: "bg-surface text-text-primary",
  },
  {
    name: "Primary text",
    token: "--color-text-primary",
    utility: "text-text-primary",
    className: "bg-text-primary text-canvas",
  },
  {
    name: "Muted text",
    token: "--color-text-muted",
    utility: "text-text-muted",
    className: "bg-text-muted text-surface",
  },
] as const;

const spaceScale = [4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 72] as const;

const radii = [
  { name: "SM 4px", radius: 4 },
  { name: "MD 12px", radius: 12 },
  { name: "LG 18px", radius: 18 },
  { name: "XL 24px", radius: 24 },
] as const;

const appliedThemes = [
  {
    name: "Light theme",
    theme: "light",
  },
  {
    name: "Dark theme",
    theme: "dark",
  },
] as const;

export default function FoundationsPage() {
  return (
    <article className="mx-auto flex w-full max-w-[1440px] flex-col gap-18 py-12 font-sans sm:gap-22 sm:py-16 lg:gap-26 lg:py-20">
      <header className="flex min-h-52 flex-col justify-between gap-16  pb-8">
        <p className="text-[10px] font-semibold uppercase tracking-widest sm:text-xs">
          Filippo Piggici / Portfolio
        </p>
        <div className="grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_minmax(18rem,27rem)] md:gap-14">
          <h1 className="text-[clamp(3.75rem,9vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.055em]">
            Foundations
          </h1>
          <p className="max-w-[44ch] text-sm leading-5 text-text-muted sm:text-base sm:leading-6">
            A compact set of foundations used across this portfolio, mapped
            directly to production tokens and Tailwind utilities.
          </p>
        </div>
      </header>

      <FoundationSection
        number="01"
        title="Colour"
        note="Semantic colour tokens map to Tailwind utilities and define the light and dark themes."
      >
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 lg:grid-cols-[repeat(5,minmax(0,1fr))] lg:gap-x-3 lg:gap-y-5">
            <div className="flex flex-col gap-2 lg:col-span-4 lg:col-start-1 lg:row-start-1">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                Light theme
              </h3>
              <div
                data-theme="light"
                className="grid grid-cols-2 gap-3 sm:grid-cols-4"
              >
                {colourTokens.map((colour) => (
                  <ColourSwatch key={colour.name} {...colour} tall />
                ))}
              </div>
            </div>

            <div className="order-3 flex flex-col gap-2 lg:order-0 lg:col-start-5 lg:row-span-2 lg:row-start-1">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                Shared token
              </h3>
              <ColourSwatch
                name="Project accent"
                token="--color-project-accent"
                utility="bg-project-accent"
                className="min-h-28 bg-project-accent text-on-project-accent lg:flex-1"
              />
            </div>

            <div className="order-2 flex flex-col gap-2 lg:order-0 lg:col-span-4 lg:col-start-1 lg:row-start-2">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                Dark theme
              </h3>
              <div
                data-theme="dark"
                className="grid grid-cols-2 gap-3 sm:grid-cols-4"
              >
                {colourTokens.map((colour) => (
                  <ColourSwatch key={colour.name} {...colour} />
                ))}
              </div>
            </div>
          </div>

          <ControlHoverSwatch />
        </div>
      </FoundationSection>

      <FoundationSection
        number="02"
        title="Typography"
        note="Avenir Next · four weights · tighter letter spacing for display text"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,.8fr)] lg:gap-14">
          <div className="flex min-w-0 flex-col gap-10">
            <TypeSpecimen
              className="text-[clamp(4rem,9vw,6.5rem)] leading-[0.9] text-project-accent"
              label="104px type · 94px line · Medium"
            >
              Outverse
            </TypeSpecimen>
            <TypeSpecimen
              className="text-[clamp(2.8rem,6vw,3.8125rem)] leading-none"
              label="61px type · 61px line · Medium"
            >
              Streaming Calculator
            </TypeSpecimen>
            <TypeSpecimen
              className="text-[clamp(2.5rem,5vw,3rem)] font-semibold leading-none"
              label="48px type · 48px line · Semi Bold"
            >
              Catch Me
            </TypeSpecimen>
            <TypeSpecimen
              className="text-2xl font-semibold leading-[1.25]"
              label="24px type · 30px line · Semi Bold"
            >
              Selected project
            </TypeSpecimen>
          </div>

          <div className="flex flex-col justify-between gap-9 border-t-[0.5px] border-border-subtle pt-8 lg:border-l-[0.5px] lg:border-t-0 lg:pl-8 lg:pt-0">
            <TextSample
              className="text-base leading-6"
              detail="16px type · 24px line · Regular"
            >
              Body — Product and frontend engineering for complex systems.
            </TextSample>
            <TextSample
              className="text-sm leading-5"
              detail="14px type · 20px line · Regular"
            >
              Small — Supporting copy and contextual guidance.
            </TextSample>
            <TextSample
              className="text-[13px] leading-4"
              detail="13px type · 16px line · Regular"
            >
              Navigation · Experience · System · Music
            </TextSample>
            <TextSample
              className="text-xs leading-4"
              detail="12px type · 16px line · Regular"
            >
              Caption — 2021 to Now · Frontend &amp; Product
            </TextSample>
            <TextSample
              className="text-[10px] font-semibold uppercase leading-[14px] tracking-widest"
              detail="10px type · 14px line · Semi Bold · +0.10em"
            >
              Now playing · Moyo
            </TextSample>
          </div>
        </div>
      </FoundationSection>

      <FoundationSection
        number="03"
        title="Spacing & shape"
        note="4px spacing base · 0.5px rules · restrained corner radii"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,29.375rem)] lg:gap-16">
          <div className="flex flex-col gap-7">
            <div className="flex min-h-20 flex-wrap items-end gap-3">
              {spaceScale.map((size) => (
                <span
                  key={size}
                  aria-label={`${size} pixels`}
                  className={
                    size === 72 ? "bg-project-accent" : "bg-text-primary"
                  }
                  style={{ width: size, height: size }}
                />
              ))}
            </div>
            <p className="text-[10px] tracking-[0.06em] text-text-muted">
              4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 56 · 64 · 72px
            </p>
            <p className="max-w-[68ch] text-sm leading-5">
              Use 4–24px within components and 32–72px between major sections.
            </p>
          </div>

          <div className="flex flex-col gap-6 border-t-[0.5px] border-border-subtle pt-8 lg:border-l-[0.5px] lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="flex flex-wrap items-center gap-3.5">
              {radii.map(({ name, radius }) => (
                <span
                  key={name}
                  aria-label={`${name} radius`}
                  className="h-[52px] w-[72px] border-[0.5px] border-border-subtle bg-surface"
                  style={{ borderRadius: radius }}
                />
              ))}
              <span
                aria-label="Full radius"
                className="size-[52px] rounded-full bg-project-accent"
              />
            </div>
            <p className="text-[10px] tracking-[0.06em] text-text-muted">
              SM 4px · MD 12px · LG 18px · XL 24px · Full
            </p>
            <p className="max-w-[48ch] text-sm leading-5">
              Use rounded corners for containers, media, popovers and circular
              controls. Keep content cards square.
            </p>
          </div>
        </div>
      </FoundationSection>

      <FoundationSection
        number="04"
        title="Applied component"
        note="One component, two themes and real browser interaction states."
      >
        <div className="grid gap-3 lg:grid-cols-[repeat(2,minmax(0,1fr))_minmax(16rem,.75fr)]">
          {appliedThemes.map(({ name, theme }) => (
            <div
              key={name}
              data-theme={theme}
              className="flex min-h-56 flex-col justify-between border-[0.5px] border-border-subtle bg-canvas p-5 text-text-primary"
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                  {name}
                </p>
                <p className="mt-2 max-w-[32ch] text-sm leading-5 text-text-muted">
                  The component keeps the same semantic utilities while its
                  token values change.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-xl border-[0.5px] border-border-subtle bg-surface px-4 py-3 text-xs font-semibold transition-[background-color,opacity,transform] duration-150 hover:bg-control-hover active:scale-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-project-accent"
                >
                  Explore project
                  <ArrowTopRightIcon
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-150 group-hover:-translate-y-px group-hover:translate-x-px group-focus-visible:-translate-y-px group-focus-visible:translate-x-px"
                  />
                </button>
                <button
                  type="button"
                  disabled
                  className="min-h-11 cursor-not-allowed pointer-events-none rounded-xl border-[0.5px] border-border-subtle bg-surface px-4 py-3 text-xs font-semibold opacity-40"
                >
                  Unavailable
                </button>
              </div>
            </div>
          ))}

          <div className="flex min-h-56 flex-col justify-between border-[0.5px] border-border-subtle p-5">
            <div>
              <p className="text-xs font-bold leading-4">Same utilities</p>
              <p className="mt-2 text-sm leading-5 text-text-muted">
                Hover or use the keyboard to inspect the actual states.
              </p>
            </div>
            <ul className="space-y-1 text-[10px] leading-4 text-text-muted">
              <li>bg-surface</li>
              <li>text-text-primary</li>
              <li>hover:bg-control-hover</li>
              <li>focus-visible:outline-project-accent</li>
              <li>disabled:cursor-default</li>
              <li>disabled:opacity-40</li>
            </ul>
          </div>
        </div>
      </FoundationSection>
    </article>
  );
}

function FoundationSection({
  number,
  title,
  note,
  children,
}: {
  number: string;
  title: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-2 border-b-[0.5px] border-border-subtle pb-3.5 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-base font-bold leading-6">
          {number} / {title}
        </h2>
        <p className="max-w-[54ch] text-xs leading-4 text-text-muted sm:text-right sm:text-sm sm:leading-5">
          {note}
        </p>
      </header>
      {children}
    </section>
  );
}

function ColourSwatch({
  name,
  token,
  utility,
  tall = false,
  className,
}: {
  name: string;
  token: string;
  utility: string;
  tall?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex flex-col justify-between border-[0.5px] border-current/15 p-3.5",
        tall ? "min-h-28" : "min-h-20",
        className,
      )}
    >
      <span className="text-xs font-semibold leading-4">{name}</span>
      <span className="flex flex-col gap-0.5 text-[10px] leading-3 opacity-70">
        <span>{token}</span>
        <span>{utility}</span>
      </span>
    </div>
  );
}

function ControlHoverSwatch() {
  return (
    <div className="grid gap-3 border-[0.5px] border-border-subtle bg-surface p-3.5 sm:grid-cols-[minmax(8rem,.6fr)_minmax(10rem,1fr)_auto] sm:items-center sm:gap-6">
      <div>
        <p className="text-xs font-semibold leading-4">Control hover</p>
        <p className="mt-0.5 text-[10px] leading-3 text-text-muted">
          --color-control-hover
        </p>
      </div>
      <p className="text-xs leading-4 text-text-muted">
        A lighter overlay in the light theme and a stronger one in the dark
        theme keeps the state equally visible.
      </p>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] leading-3 text-text-muted sm:justify-end">
        <span data-theme="light" className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="relative size-4 overflow-hidden border-[0.5px] border-border-subtle bg-surface after:absolute after:inset-0 after:bg-control-hover"
          />
          Light
        </span>
        <span data-theme="dark" className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="relative size-4 overflow-hidden border-[0.5px] border-border-subtle bg-surface after:absolute after:inset-0 after:bg-control-hover"
          />
          Dark
        </span>
      </div>
    </div>
  );
}

function TypeSpecimen({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className: string;
  label: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2 xl:flex-row xl:items-baseline xl:gap-4">
      <p className={`min-w-0 font-medium tracking-[-0.05em] ${className}`}>
        {children}
      </p>
      <span className="shrink-0 text-[10px] leading-3 text-text-muted">
        {label}
      </span>
    </div>
  );
}

function TextSample({
  children,
  className,
  detail,
}: {
  children: ReactNode;
  className: string;
  detail: string;
}) {
  return (
    <div>
      <p className={className}>{children}</p>
      <p className="pt-1 text-[10px] leading-3 text-text-muted">{detail}</p>
    </div>
  );
}
