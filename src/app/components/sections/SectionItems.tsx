import { IconCopy } from "@tabler/icons-react";
import { toast } from "sonner";
import InvoiceForm from "../InvoiceForm"; // assuming the component exists
import {SectionItemsProps} from "@/app/utils/interfaces"




export default function SectionItems({
  children,
  content,
  finished,
}: SectionItemsProps) {
  function copy() {
    if (content) {
      navigator.clipboard.writeText(JSON.stringify(content, null, 2));
      toast.success("Copied to clipboard");
    }
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
        <>
          <div className="bg-gray-200 dark:bg-gray-800 animate-pulse rounded w-full h-6 mb-1" />
          <div className="bg-gray-200 dark:bg-gray-800 animate-pulse rounded w-full h-12 mb-1" />
          <div className="bg-gray-200 dark:bg-gray-800 animate-pulse rounded w-full h-6 mb-1" />
        </>
      )}
      {content && <InvoiceForm invoiceData={content} />}
      {finished && !content && (
        <p className="text-gray-600 dark:text-gray-400 select-none">
          No text was found in that image.
        </p>
      )}
    </div>
  );
}
