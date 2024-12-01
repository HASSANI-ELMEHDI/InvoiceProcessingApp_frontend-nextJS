interface InvoiceItem {
	description: string;
	qty: number;
	rate: number;
	total: number;
  }
  
  export interface Invoice {
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
  
  export interface SectionItemsProps {
  children: string;
  content?: Invoice | null;
  finished: boolean;
}

export interface SectionJsonProps {
    children: string;
    content?: Invoice | null;
    finished: boolean;
  }
  