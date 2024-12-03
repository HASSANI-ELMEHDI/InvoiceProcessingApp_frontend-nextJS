export interface InvoiceItem {
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
    children?: React.ReactNode;
    content?: InputData | null;
    finished: boolean;
  }
  

  export interface TapHolderProps {
    content?: InputData | null;
    finished: boolean;
  }
  

  
interface TabItem {
	title: string;
	content?: React.ReactNode;
	disabled?: boolean;
  }
  
  export interface TabsComponentProps {
	items: TabItem[];
  }




  
  interface MenuItem {
	cnt: string; // Quantity as string
	nm: string;  // Item description
	price: string; // Price as string
  }
  
  export interface InputData {
	  data : { menu: MenuItem[];
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
	}
  }