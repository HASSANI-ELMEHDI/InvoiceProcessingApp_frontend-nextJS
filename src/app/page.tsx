"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {  IconLoader2 } from "@tabler/icons-react";
import { toast } from "sonner";
import Image from "next/image";
import { isSupportedImageType,transformData } from "@/app/utils/utils";
import { track } from "@vercel/analytics";
import { fetchTextAndDescription } from "./services/api";
import { toBase64 } from "./utils/fileUtils";
import SectionJson from "./components/sections/SectionJson";


interface InvoiceItem {
	description: string;
	qty: number;
	rate: number;
	total: number;
  }
  
  interface Invoice {
	id: number;
	name: string;
	senderEmail: string;
	recipientEmail: string;
	shippingAddress: string;
	date: string;
	dueDate: string;
	invoiceNote: string;
	items: InvoiceItem[]; // Changed to a list of items
  }

export default function Home() {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [blobURL, setBlobURL] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [text, setText] = useState<Invoice|null>(null);
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);




  async function submit(file?: File) {

	setText(null);
	setDescription("");
    if (!file) return;

    if (!isSupportedImageType(file.type)) {
      return toast.error(
        "Unsupported format. Only JPEG, PNG, GIF, and WEBP files are supported."
      );
    }

    if (file.size > 4.5 * 1024 * 1024) {
      return toast.error("Image too large, maximum file size is 4.5MB.");
    }

    const base64 = await toBase64(file);

    // roughly 4.5MB in base64
    if (base64.length > 6_464_471) {
      return toast.error("Image too large, maximum file size is 4.5MB.");
    }

    setBlobURL(URL.createObjectURL(file));
    setFinished(false);
    setIsLoading(true);

    const { total, data } = await fetchTextAndDescription(file);
	setDescription(total);
	setData(data);
	setText(transformData(data));
    
    setIsLoading(false);
    setFinished(true);
  }

  function handleDragLeave() {
    setIsDraggingOver(false);
  }

  function handleDragOver(e: DragEvent) {
    setIsDraggingOver(true);
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
  }

  async function handleDrop(e: DragEvent) {
    track("Drop");

    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    const file = e.dataTransfer?.files?.[0];
    submit(file);
  }

  async function handlePaste(e: ClipboardEvent) {
    track("Paste");
    const file = e.clipboardData?.files?.[0];
    submit(file);
  }

  async function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    track("Upload");
    const file = e.target.files?.[0];
    submit(file);
  }

  useEffect(() => {
    addEventListener("paste", handlePaste);
    addEventListener("drop", handleDrop);
    addEventListener("dragover", handleDragOver);
    addEventListener("dragleave", handleDragLeave);

    return () => {
      removeEventListener("paste", handlePaste);
      removeEventListener("drop", handleDrop);
      removeEventListener("dragover", handleDragOver);
      removeEventListener("dragleave", handleDragLeave);
    };
  });

 
  return (
    <>
      <div
        className={clsx(
          "rounded-lg border-4 drop-shadow-sm text-gray-700 dark:text-gray-300 cursor-pointer border-dashed transition-colors ease-in-out bg-gray-100 dark:bg-gray-900 relative group select-none grow pointer-events-none [@media(hover:hover)]:pointer-events-auto",
          {
            "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700":
              !isDraggingOver,
            "border-blue-300 dark:border-blue-700": isDraggingOver,
          }
        )}
        onClick={() => inputRef.current?.click()}
      >
        {blobURL && (
          <Image
            src={blobURL}
            unoptimized
            fill
            className="lg:object-contain object-cover min-h-16"
            alt="Uploaded image"
          />
        )}

      <div
  className={clsx(
    "flex flex-col w-full h-full p-3 items-center justify-center text-center absolute bg-gray-100/70 dark:bg-gray-900/70 text-lg transition-opacity duration-300",
    {
      "opacity-100": isLoading || !blobURL,
      "opacity-0 group-hover:opacity-100": !isLoading,
    }
  )}
>

          {isLoading ? (
            <IconLoader2 className="animate-spin size-12" />
          ) : (
            <>
              <p className="font-bold mb-4">Invoice to data.</p>
              <p className="hidden [@media(hover:hover)]:block">
                Drop or paste anywhere, or click to upload.
              </p>
              <div className="w-56 space-y-4 [@media(hover:hover)]:hidden pointer-events-auto">
                <button className="rounded-full w-full py-3 bg-black dark:bg-white text-white dark:text-black">
                  Tap to upload
                </button>
                <input
                  type="text"
                  onKeyDown={(e) => e.preventDefault()}
                  placeholder="Hold to paste"
                  onClick={(e) => e.stopPropagation()}
                  className="text-center w-full rounded-full py-3 bg-gray-200 dark:bg-gray-800 placeholder-black dark:placeholder-white focus:bg-white dark:focus:bg-black focus:placeholder-gray-700 dark:focus:placeholder-gray-300 transition-colors ease-in-out focus:outline-none border-2 focus:border-blue-300 dark:focus:border-blue-700 border-transparent"
                />
              </div>
              <p className="text-sm mt-3 text-gray-700 dark:text-gray-300">
                (images are not stored)
              </p>
            </>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleInputChange}
          accept="image/jpeg, image/png, image/gif, image/webp"
        />
      </div>

      {(isLoading || description || text) && (
		<>
		
		<div className="space-y-3 basis-1/2 p-3 rounded-md bg-gray-100 dark:bg-gray-900 w-full drop-shadow-sm">
		<SectionJson finished={finished} content={data.data}>
			JSON
		  </SectionJson>
	   </div>
		</>
      )}
    </>
  );
}









