export function toBase64(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result !== "string") return;
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
    });
  }
  
  export function downloadAsJson(obj: any, fileName: string): void {
    const jsonString = JSON.stringify(obj, null, 2); // Pretty-printed JSON
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");
    link.download = `${fileName}.json`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }
  