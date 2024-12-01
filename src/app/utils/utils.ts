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
	items: InvoiceItem[]; // A list of items
  }
  
  interface MenuItem {
	cnt: string; // Quantity as string
	nm: string;  // Item description
	price: string; // Price as string
  }
  
  interface InputData {
	data: {
	  menu: MenuItem[];
	  sub_total: {
		etc: string;
		subtotal_price: string;
		tax_price: string;
	  };
	  total: {
		cashprice: string;
		changeprice: string;
		total_price: string;
	  };
	};
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
  
