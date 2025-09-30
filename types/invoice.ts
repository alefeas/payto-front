export type InvoiceType = 'A' | 'B' | 'C';

export type InvoiceItem = {
  code: string;
  description: string;
  quantity: number;
  unitPrice: number;
  netAmount: number;
};

export type InvoicePerception = {
  id: string;
  description: string;
  amount: number;
};

export type Client = {
  cuit: string;
  name: string;
};

export type Provider = {
  cuit: string;
  name: string;
};

export type Invoice = {
  id: string;
  invoiceType: InvoiceType;
  invoiceNumber: string;
  client: Client;
  provider: Provider;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  iva: number;
  perceptions: InvoicePerception[];
  total: number;
  status: 'pending_approval' | 'approved' | 'paid' | 'overdue';
  pdfUrl?: string;
};

export interface InvoiceFormData {
  invoiceType: InvoiceType;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  client: Client;
  items: InvoiceItem[];
  iva: number;
  perceptions: InvoicePerception[];
}
