'use client'

import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Invoice, InvoiceItem, InvoicePerception } from "@/types/invoice"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface InvoiceDetailsProps {
  invoice: Invoice | null
}

export function InvoiceDetails({ invoice }: InvoiceDetailsProps) {
  if (!invoice) {
    return null;
  }
  const statusMap: Record<string, { label: string; variant: "default" | "destructive" | "outline" | "secondary" }> = {
    pending_approval: {
      label: "Pendiente de Aprobación",
      variant: "outline"
    },
    approved: {
      label: "Aprobada",
      variant: "secondary"
    },
    paid: {
      label: "Pagada",
      variant: "default"
    },
    overdue: {
      label: "Vencida",
      variant: "destructive"
    }
  }

  const handleDownloadPDF = async () => {
    try {
      // Usar el PDF provisional proporcionado
      const response = await fetch('/Unidad N3 practica.pdf');
      const blob = await response.blob();
      
      // Crear un objeto URL para el blob
      const url = window.URL.createObjectURL(blob);
      
      // Crear un elemento <a> temporal
      const link = document.createElement('a');
      link.href = url;
      link.download = `factura-${invoice.invoiceNumber}.pdf`;
      
      // Agregar el link al documento, hacer click y removerlo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Liberar el objeto URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
      alert('Hubo un error al generar el PDF. Por favor intente nuevamente.');
    }
  };

  return (
    <>
      <DialogHeader className="flex flex-row items-center justify-between">
        <DialogTitle>Detalles de Factura</DialogTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDownloadPDF}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Descargar PDF
        </Button>
      </DialogHeader>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Información General</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-muted-foreground">Tipo</dt>
                <dd>Factura {invoice.invoiceType}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Número</dt>
                <dd>{invoice.invoiceNumber}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Estado</dt>
                <dd>
                  <Badge variant={statusMap[invoice.status].variant}>
                    {statusMap[invoice.status].label}
                  </Badge>
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Fechas</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-muted-foreground">
                  Fecha de Emisión
                </dt>
                <dd>{format(new Date(invoice.issueDate), "dd/MM/yyyy")}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">
                  Fecha de Vencimiento
                </dt>
                <dd>{format(new Date(invoice.dueDate), "dd/MM/yyyy")}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Cliente</h3>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-muted-foreground">Nombre</dt>
              <dd>{invoice.client.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">CUIT</dt>
              <dd>{invoice.client.cuit}</dd>
            </div>
          </dl>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-4">Items</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium">
              <div className="col-span-2">Código</div>
              <div className="col-span-4">Descripción</div>
              <div className="col-span-2">Cantidad</div>
              <div className="col-span-2">Precio Unit.</div>
              <div className="col-span-2">Importe</div>
            </div>
            {invoice.items.map((item: InvoiceItem, index: number) => (
              <div key={index} className="grid grid-cols-12 gap-4">
                <div className="col-span-2">{item.code}</div>
                <div className="col-span-4">{item.description}</div>
                <div className="col-span-2">{item.quantity}</div>
                <div className="col-span-2">${item.unitPrice.toFixed(2)}</div>
                <div className="col-span-2">${item.netAmount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {invoice.perceptions.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Percepciones</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-6 gap-4 text-sm font-medium">
                <div className="col-span-4">Descripción</div>
                <div className="col-span-2">Importe</div>
              </div>
              {invoice.perceptions.map((perception: InvoicePerception) => (
                <div key={perception.id} className="grid grid-cols-6 gap-4">
                  <div className="col-span-4">{perception.description}</div>
                  <div className="col-span-2">
                    ${perception.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t pt-4">
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>${invoice.subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>IVA</dt>
              <dd>${invoice.iva.toFixed(2)}</dd>
            </div>
            {invoice.perceptions.length > 0 && (
              <div className="flex justify-between">
                <dt>Total Percepciones</dt>
                <dd>
                  $
                  {invoice.perceptions
                    .reduce((sum: number, p: InvoicePerception) => sum + p.amount, 0)
                    .toFixed(2)}
                </dd>
              </div>
            )}
            <div className="flex justify-between font-bold pt-2 border-t">
              <dt>Total</dt>
              <dd>${invoice.total.toFixed(2)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  )
}