export type InvoiceShareStatus = 
  | 'pending' // Factura enviada, esperando respuesta
  | 'accepted' // Factura aceptada por el receptor
  | 'rejected' // Factura rechazada por el receptor
  | 'cancelled'; // Envío cancelado por el emisor

export interface InvoiceShare {
  id: string;
  invoiceId: string;
  senderId: string; // ID de la empresa que envía
  senderName: string; // Nombre de la empresa que envía
  recipientId: string; // ID de la empresa que recibe
  recipientName: string; // Nombre de la empresa que recibe
  status: InvoiceShareStatus;
  sharedAt: Date;
  respondedAt?: Date;
  rejectionReason?: string;
  notes?: string;
}

// Para la respuesta del receptor
export interface InvoiceShareResponse {
  accepted: boolean;
  rejectionReason?: string;
  notes?: string;
}