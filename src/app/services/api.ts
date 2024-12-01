export async function fetchTextAndDescription(file: File) {
    try {
      const formData = new FormData();
      formData.append('image', file);
  
      const response = await fetch('http://localhost:8080/api/process-image', {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const data = await response.json();
      return { total: data.data.total.total_price, data: data };
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || "Something went wrong.");
    }
  }
  