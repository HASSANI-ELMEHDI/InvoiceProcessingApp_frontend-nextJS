"use client";
import React from "react";

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

interface InvoiceFormProps {
  invoiceData: Invoice; // Invoice data passed as a prop
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoiceData }) => {
  return (

      <div className="pt-4">
    
        {/* Invoice Items Table */}
        <div className="overflow-x-auto bg-gray-50 rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Description</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Rate</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.description}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.qty}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.rate}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

  );
};

export default InvoiceForm;
