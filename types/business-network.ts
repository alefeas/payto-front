export type BusinessNetworkCompanyStatus = 'connected' | 'pending' | 'rejected' | 'blocked';

export interface BusinessNetworkCompany {
  id: string;
  name: string;
  cuit: string;
  status: BusinessNetworkCompanyStatus;
  connectionDate: string;
  transactionsCount: number;
  lastTransaction: string | null;
}

// Tipos de conexión entre empresas
export type ConnectionStatus = BusinessNetworkCompanyStatus;

export interface BusinessConnection {
  id: string;
  companyId: string; // ID de la empresa conectada
  companyName: string; // Nombre de la empresa conectada
  companyCuit: string; // CUIT de la empresa conectada
  status: ConnectionStatus;
  createdAt: Date;
  updatedAt: Date;
  lastInvoiceDate?: Date; // Fecha de la última factura intercambiada
  totalInvoices: number; // Total de facturas intercambiadas
  totalAmount: number; // Monto total de facturas intercambiadas
}

export interface ConnectionRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderCuit: string;
  recipientId: string;
  recipientName: string;
  recipientCuit: string;
  message?: string;
  status: ConnectionStatus;
  createdAt: Date;
  respondedAt?: Date;
}

// Para la respuesta a una solicitud de conexión
export interface ConnectionResponse {
  accepted: boolean;
  rejectionReason?: string;
}