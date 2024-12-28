const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchTextAndDescription(file: File) {
    try {
      const formData = new FormData();
      formData.append('image', file);
  
      const response = await fetch(`${apiBaseUrl}/data`, {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const data = await response.json();
      return { data: data };
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || "Something went wrong.");
    }
  }
  