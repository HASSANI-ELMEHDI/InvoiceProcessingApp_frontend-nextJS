import {InputData,Invoice,InvoiceItem} from "@/app/utils/interfaces"

type SupportedImageTypes =
	| "image/jpeg"
	| "image/png"
	| "image/gif"
	| "image/webp";

export function isSupportedImageType(
	type: string
): type is SupportedImageTypes {
	return ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
		type
	);
}


  export function transformData(inputData: InputData): Invoice {
	// Destructure the input data
	const { menu, sub_total, total } = inputData.data;
  
	// Create the transformed invoice items from the menu data
	const items: InvoiceItem[] = menu.map(item => ({
	  description: item.nm,
	  qty: parseInt(item.cnt),  // Convert quantity to number
	  rate: parseFloat(item.price),  // Convert price to number
	  total: parseFloat(item.price) * parseInt(item.cnt)  // Calculate total for each item
	}));
  
	// Return the transformed invoice object
	const invoice: Invoice = {
	  id: 1,  // Assuming id as 1 for now
	  name: "Sample Invoice",  // You can replace it with an actual name if needed
	  senderEmail: "sender@example.com",  // Replace with actual sender email
	  recipientEmail: "recipient@example.com",  // Replace with actual recipient email
	  shippingAddress: "123 Main St, City, Country",  // Replace with actual address
	  date: "2024-12-01",  // Replace with the actual date
	  dueDate: "2024-12-15",  // Replace with the actual due date
	  invoiceNote: "Thank you for your business!",
	  items: items,
	};
  
	return invoice;
  }
  
