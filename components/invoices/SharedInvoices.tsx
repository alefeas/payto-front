'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InvoiceShare } from '@/types/invoice-sharing';
import { ReviewInvoiceDialog } from './ReviewInvoiceDialog';
import { Invoice } from '@/types/invoice';

// Mock data - Reemplazar con llamadas a la API
const mockSharedInvoices: InvoiceShare[] = [
  {
    id: '1',
    invoiceId: '1',
    senderId: '1',
    senderName: 'Empresa A',
    recipientId: '2',
    recipientName: 'Mi Empresa',
    status: 'pending',
    sharedAt: new Date(),
  }
];

const mockInvoice: Invoice = {
  id: '1',
  invoiceType: 'A',
  invoiceNumber: '0001-00000001',
  client: {
    cuit: '30-12345678-9',
    name: 'Cliente A'
  },
  provider: {
    cuit: '30-98765432-1',
    name: 'Proveedor A'
  },
  issueDate: new Date().toISOString(),
  dueDate: new Date().toISOString(),
  items: [],
  subtotal: 1000,
  iva: 210,
  perceptions: [],
  total: 1210,
  status: 'pending_approval'
};

export function SharedInvoices() {
  const [activeTab, setActiveTab] = useState('received');
  const [invoices, setInvoices] = useState(mockSharedInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceShare | null>(null);

  const handleResponse = async (response: { accepted: boolean; rejectionReason?: string; notes?: string }) => {
    try {
      // TODO: Implementar cuando esté el backend
      await fetch(`/api/invoices/shared/${selectedInvoice?.id}/respond`, {
        method: 'POST',
        body: JSON.stringify(response)
      });

      // Actualizar la lista de facturas
      setInvoices(invoices.filter(i => i.id !== selectedInvoice?.id));
      setSelectedInvoice(null);
    } catch (error) {
      console.error('Error responding to shared invoice:', error);
    }
  };

  const statusBadgeVariant: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
    pending: 'outline',
    accepted: 'default',
    rejected: 'destructive',
    cancelled: 'secondary'
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Facturas Compartidas</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="received">
            Recibidas
            {invoices.filter(i => i.recipientId === '2' && i.status === 'pending').length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {invoices.filter(i => i.recipientId === '2' && i.status === 'pending').length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="sent">
            Enviadas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-4">
          {invoices
            .filter(i => i.recipientId === '2')
            .map((invoice) => (
              <Card key={invoice.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Factura de {invoice.senderName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Enviada el {new Date(invoice.sharedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={statusBadgeVariant[invoice.status]}>
                      {invoice.status === 'pending' ? 'Pendiente' : 
                       invoice.status === 'accepted' ? 'Aceptada' : 
                       invoice.status === 'rejected' ? 'Rechazada' : 'Cancelada'}
                    </Badge>
                    {invoice.status === 'pending' && (
                      <Button size="sm" onClick={() => setSelectedInvoice(invoice)}>
                        Revisar
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          {invoices
            .filter(i => i.senderId === '2')
            .map((invoice) => (
              <Card key={invoice.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enviada a {invoice.recipientName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Enviada el {new Date(invoice.sharedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={statusBadgeVariant[invoice.status]}>
                    {invoice.status === 'pending' ? 'Pendiente' : 
                     invoice.status === 'accepted' ? 'Aceptada' : 
                     invoice.status === 'rejected' ? 'Rechazada' : 'Cancelada'}
                  </Badge>
                </div>
              </Card>
            ))}
        </TabsContent>
      </Tabs>

      {selectedInvoice && (
        <ReviewInvoiceDialog
          invoiceShare={selectedInvoice}
          invoice={mockInvoice} // TODO: Obtener la factura real del backend
          open={selectedInvoice !== null}
          onOpenChange={(open) => !open && setSelectedInvoice(null)}
          onRespond={handleResponse}
        />
      )}
    </div>
  );
}