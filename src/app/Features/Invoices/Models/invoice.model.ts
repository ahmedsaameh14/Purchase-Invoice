// It Will Help With API integration

import { Product, Supplier } from './product.model';

// ===== REQUEST DTO (What we send to backend) =====
export interface InvoiceHeader {
  invoiceDate: string;  // ISO string format for API
  supplierId: Supplier['id'];
  notes: string;
}

export interface InvoiceItem {
  itemCode: Product['code'];
  itemName: Product['name'];
  quantity: number;
  unitPrice: Product['unitPrice'];
  lineTotal: number;
}

export interface CreateInvoiceRequest {
  header: InvoiceHeader;
  items: InvoiceItem[];
  grandTotal: number;
}