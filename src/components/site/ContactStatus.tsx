import { Cross1Icon } from "@radix-ui/react-icons";

interface ContactStatusProps {
  email: string;
  error: string;
  status: "success" | "error";
  onDismiss: () => void;
}

export default function ContactStatus({
  email,
  error,
  status,
  onDismiss,
}: ContactStatusProps) {
  return (
    <div
      role={status === "success" ? "status" : "alert"}
      className="absolute inset-x-3 bottom-3 flex items-start gap-3 rounded-xl border-[0.5px] border-text-primary/10 bg-surface/82 px-3 py-2.5 text-xs leading-snug shadow-[0_4px_18px_rgb(17_17_15/0.09)] backdrop-blur-lg dark:border-white/10 dark:bg-surface/78 dark:shadow-[0_5px_20px_rgb(0_0_0/0.24)]"
    >
      <span className="min-w-0 flex-1">
        {status === "success" ? (
          <>
            <span className="block font-semibold text-text-primary">
              Message sent to Filippo
            </span>
            <span className="block break-words text-text-muted">
              Receipt sent to {email}
            </span>
          </>
        ) : (
          <span className="text-text-muted">{error}</span>
        )}
      </span>
      <button
        type="button"
        aria-label="Dismiss message status"
        onClick={onDismiss}
        className="-mr-1 grid size-6 shrink-0 place-items-center rounded-full text-text-muted transition-colors hover:bg-text-primary/6 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-project-accent dark:hover:bg-white/6"
      >
        <Cross1Icon className="size-3" />
      </button>
    </div>
  );
}
