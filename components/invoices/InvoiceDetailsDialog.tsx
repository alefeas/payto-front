'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Invoice } from "@/types/invoice"
import { format } from "date-fns"

interface InvoiceDetailsDialogProps {
  invoice: Invoice | null
  isOpen: boolean
  onClose: () => void
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(amount)

export function InvoiceDetailsDialog({ invoice, isOpen, onClose }: InvoiceDetailsDialogProps) {
  if (!invoice) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalles de la Factura {invoice.invoiceNumber}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Tipo de Factura</h3>
              <p>{invoice.invoiceType}</p>
            </div>
            <div>
              <h3 className="font-semibold">Proveedor</h3>
              <p>{invoice.provider.name}</p>
              <p>CUIT: {invoice.provider.cuit}</p>
            </div>
            <div className="text-right">
              <h3 className="font-semibold">Fechas</h3>
              <p>Emisión: {format(new Date(invoice.issueDate), "dd/MM/yyyy")}</p>
              <p>Vencimiento: {format(new Date(invoice.dueDate), "dd/MM/yyyy")}</p>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2">Ítems</h3>
            <div className="rounded-md border">
                <table className="w-full text-sm">
                    <thead className="bg-muted">
                        <tr className="text-left">
                            <th className="p-2">Código</th>
                            <th className="p-2">Descripción</th>
                            <th className="p-2 text-right">Cantidad</th>
                            <th className="p-2 text-right">Precio Unit.</th>
                            <th className="p-2 text-right">Importe Neto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-2">{item.code}</td>
                                <td className="p-2">{item.description}</td>
                                <td className="p-2 text-right">{item.quantity}</td>
                                <td className="p-2 text-right">{formatCurrency(item.unitPrice)}</td>
                                <td className="p-2 text-right">{formatCurrency(item.netAmount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div></div>
            <div className="grid gap-2 text-right">
                <div className="flex justify-between">
                    <span className="font-semibold">Subtotal:</span>
                    <span>{formatCurrency(invoice.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">IVA:</span>
                    <span>{formatCurrency(invoice.iva)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Percepciones:</span>
                    <span>{formatCurrency(invoice.percepciones)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{formatCurrency(invoice.total)}</span>
                </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
