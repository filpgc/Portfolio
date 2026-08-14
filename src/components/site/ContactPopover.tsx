"use client";

import avatar from "@/assets/avatar.png";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { ArrowTopRightIcon, Cross1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { type SubmitEvent, useRef, useState } from "react";
import ContactStatus from "./ContactStatus";

type SubmitStatus = "idle" | "sending" | "success" | "error";

const DEFAULT_ERROR = "The message could not be sent.";
const VERIFICATION_ERROR =
  "Verification is unavailable. Please email me directly instead.";
const TURNSTILE_SITE_KEY =
  process.env.NODE_ENV === "development"
    ? "1x00000000000000000000AA"
    : (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "");

export default function ContactPopover() {
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const turnstileToken = turnstileRef.current?.getResponse();

    if (!turnstileToken) {
      setSubmitError(VERIFICATION_ERROR);
      setSubmitStatus("error");
      return;
    }

    setSubmitStatus("sending");
    setSubmitError("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          message: text,
          turnstileToken,
        }),
      });

      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        throw new Error(result.error ?? DEFAULT_ERROR);
      }

      setSubmittedEmail(email);
      setEmail("");
      setText("");
      setSubmitStatus("success");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : DEFAULT_ERROR);
      setSubmitStatus("error");
    } finally {
      setIsVerified(false);
      turnstileRef.current?.reset();
    }
  }

  function resetSubmissionStatus() {
    setSubmittedEmail("");
    setSubmitError("");
    setSubmitStatus("idle");
  }

  return (
    <>
      <button
        type="button"
        popoverTarget="my-popover"
        className="chat-invite relative isolate hidden min-h-11 items-center rounded-full px-3 py-0.5 font-semibold leading-none tracking-[-0.01em] transition-[background-color,transform] duration-150 hover:bg-text-primary/6 active:scale-97 group-has-[:popover-open]/site-header:bg-text-primary/6 md:flex"
      >
        Let&apos;s chat
      </button>

      <div
        popover="auto"
        id="my-popover"
        onToggle={(event) => {
          const isOpen = event.currentTarget.matches(":popover-open");
          setIsPopoverOpen(isOpen);
          if (!isOpen) setIsVerified(false);
        }}
        className="absolute inset-auto right-[calc(var(--spacing-page-padding)+16px)] top-[94px] m-0 w-[360px] rounded-[18px] border-[0.5px] border-border-subtle bg-surface text-text-primary shadow-md outline-[0.5px] outline-text-primary/8 outline-offset-1 [--motion-enter-y:-4px] [&:popover-open]:animate-[motion-enter_200ms_cubic-bezier(0.22,1,0.36,1)] sm:-outline-offset-2 max-md:hidden"
      >
        <div className="flex flex-col divide-y-[0.5px] divide-text-primary/8 p-[1.5px]">
          <div className="flex items-center gap-2 p-4">
            <span
              className="relative my-auto size-11 overflow-hidden rounded-full border-[0.5px] border-border-subtle sm:size-8.5"
              aria-label="Filippo Piggici"
            >
              <Image
                alt=""
                src={avatar}
                fill
                className="-scale-x-135 scale-y-135 bg-text-primary/20 object-contain object-bottom pt-1.5"
              />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-bold">Filippo Piggici</span>
              <span className="text-xs text-text-muted/70 font-medium -mt-[0.5px]">
                replies by email
              </span>
            </div>

            <button
              type="button"
              aria-label="Close contact form"
              className="relative ml-auto grid size-8.5 shrink-0 place-items-center rounded-full bg-text-primary/[0.035] text-text-primary/70 transition-[background-color,color,transform] duration-150 ease-out after:absolute after:-inset-1.5 hover:bg-text-primary/[0.07] hover:text-text-primary active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-project-accent dark:bg-white/[0.05] dark:hover:bg-white/[0.09]"
              popoverTarget="my-popover"
              popoverTargetAction="hide"
            >
              <Cross1Icon className="size-3.5" />
            </button>
          </div>

          <div className="bg-text-primary/4 p-4">
            <div className="max-w-[80%] rounded-2xl rounded-bl-md border-[0.5px] border-border-subtle bg-surface p-3 text-[13px]">
              Hey, send me a message here and I’ll reply by email, usually
              within a day.
            </div>
          </div>

          <form
            className="flex flex-col divide-y-[0.5px] divide-text-primary/8 p-[1.5px]"
            onSubmit={handleSubmit}
          >
            <label className="block p-4">
              <span className="sr-only">Your email address</span>
              <input
                autoFocus
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                autoComplete="email"
                data-1p-ignore
                name="email"
                required
                maxLength={254}
                className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted/70 focus-within:outline-0"
                placeholder="your@email.com"
              />
            </label>
            <div className="relative flex border-b-0!">
              <label className="flex w-full p-4">
                <span className="sr-only">Message</span>
                <textarea
                  value={text}
                  onChange={(event) => setText(event.currentTarget.value)}
                  name="message"
                  required
                  maxLength={5000}
                  className="field-sizing-content min-h-[5rem] max-h-[25rem] w-full resize-none bg-transparent text-sm text-text-primary placeholder:text-text-muted/70 focus-within:outline-0"
                  rows={7}
                  placeholder="Write a message"
                />
              </label>

              {(submitStatus === "success" || submitStatus === "error") && (
                <ContactStatus
                  status={submitStatus}
                  email={submittedEmail}
                  error={submitError}
                  onDismiss={resetSubmissionStatus}
                />
              )}
            </div>

            {isPopoverOpen && TURNSTILE_SITE_KEY && (
              <Turnstile
                ref={turnstileRef}
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={() => setIsVerified(true)}
                onExpire={() => setIsVerified(false)}
                onError={() => {
                  setIsVerified(false);
                  setSubmitError(VERIFICATION_ERROR);
                  setSubmitStatus("error");
                }}
                options={{
                  action: "contact",
                  appearance: "interaction-only",
                  size: "flexible",
                }}
              />
            )}

            <div className="flex items-center justify-between p-4">
              <a
                href="mailto:filippo.piggici@gmail.com"
                className="group inline-flex items-center text-xs font-medium text-text-muted/70 transition-colors hover:text-text-primary/90"
              >
                <span className="underline-offset-2 group-hover:underline">
                  or email directly
                </span>
                <ArrowTopRightIcon
                  aria-hidden="true"
                  className="ml-0.5 mt-px size-3 transition-transform duration-150 group-hover:-translate-y-px group-hover:translate-x-px"
                />
              </a>
              <button
                type={submitStatus === "success" ? "button" : "submit"}
                disabled={
                  submitStatus === "sending" ||
                  (submitStatus !== "success" && !isVerified)
                }
                onClick={
                  submitStatus === "success" ? resetSubmissionStatus : undefined
                }
                className="ml-auto rounded-full bg-text-primary/6 px-4 py-3 text-[13px] font-semibold leading-none tracking-[-0.01em] text-text-primary/90 transition-[background-color,opacity,transform] duration-150 hover:bg-text-primary/10 active:scale-95 disabled:cursor-wait disabled:opacity-50"
              >
                {submitStatus === "sending"
                  ? "Sending…"
                  : submitStatus === "success"
                    ? "New message"
                    : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
