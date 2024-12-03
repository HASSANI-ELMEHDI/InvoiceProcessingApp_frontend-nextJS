import { IconCopy, IconDownload } from "@tabler/icons-react";
import { toast } from "sonner";
import JsonSyntaxHighlighter from "../JsonSyntaxHighlighter"; 
import { downloadAsJson } from "@/app/utils/fileUtils"; 
import {SectionJsonProps} from "@/app/utils/interfaces"


export default function SectionJson({
  children,
  content,
  finished,
}: SectionJsonProps) {
  function copy() {
    if (content) {
      navigator.clipboard.writeText(JSON.stringify(content, null, 2));
      toast.success("Copied to clipboard");
    }
  }

  function download() {
    if (content) {
      downloadAsJson(content, "invoice");
      toast.success("File downloaded");
    }
  }

  const loading = !finished;

  return (
    <div>
      {finished && (
        <>
          <button
            className="float-right rounded-md p-1 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ease-in-out"
            onClick={copy}
            aria-label="Copy to clipboard"
          >
            <IconCopy />
          </button>
          <button
            onClick={download}
            className="float-right mr-20 rounded-md underline hover:no-underline hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center gap-2"
          >
            <IconDownload className="size-4" /> Download As Json
          </button>
        </>
      )}

      <h2 className="font-semibold select-none text-gray-600 dark:text-gray-400">
        {children}
      </h2>

      {loading && (
        <>
          <div className="bg-gray-200 dark:bg-gray-800 animate-pulse rounded w-full h-6 mb-1" />
          <div className="bg-gray-200 dark:bg-gray-800 animate-pulse rounded w-full h-12 mb-1" />
          <div className="bg-gray-200 dark:bg-gray-800 animate-pulse rounded w-full h-6 mb-1" />
        </>
      )}

      {finished && (
        <JsonSyntaxHighlighter json={JSON.stringify(content, null, 2)} />
      )}

      {finished && !content && (
        <p className="text-gray-600 dark:text-gray-400 select-none">
          No text was found in that image.
        </p>
      )}
    </div>
  );
}
