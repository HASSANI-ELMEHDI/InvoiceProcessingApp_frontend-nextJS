import { IconCopy } from "@tabler/icons-react";
import { toast } from "sonner";

interface SectionTotalProps {
  children: string;
  content?: string;
  finished: boolean;
}

export default function SectionTotal({
  children,
  content,
  finished,
}: SectionTotalProps) {
  function copy() {
    navigator.clipboard.writeText(content || "");
    toast.success("Copied to clipboard");
  }

  const loading = !content && !finished;

  return (
    <div>
      {content && (
        <button
          className="float-right rounded-md p-1 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ease-in-out"
          onClick={copy}
          aria-label="Copy to clipboard"
        >
          <IconCopy />
        </button>
      )}
      <h2 className="font-semibold select-none text-gray-600 dark:text-gray-400">
        {children}
      </h2>
      {loading && (
        <div className="bg-gray-200 dark:bg-gray-800 animate-pulse rounded w-full h-6" />
      )}
      {content && (
        <p className="whitespace-pre-wrap break-words">{content.trim()}</p>
      )}
      {finished && !content && (
        <p className="text-gray-600 dark:text-gray-400 select-none">
          No text was found in that image.
        </p>
      )}
    </div>
  );
}
