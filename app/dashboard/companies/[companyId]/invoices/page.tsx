'use client'

import { useState } from "react"
import { InvoicesDataTable } from "@/components/invoices/InvoicesDataTable"
import { columns } from "@/components/invoices/columns"
import { InvoiceDetails } from "@/components/invoices/InvoiceDetails"
import { type Invoice } from "@/types/invoice"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Datos de ejemplo - Reemplazar con datos reales del backend
const invoices: Invoice[] = [
  {
    id: "1",
    invoiceType: "A",
    invoiceNumber: "0001-00000001",
    client: {
      cuit: "30712345678",
      name: "Cliente Ejemplo S.A."
    },
    provider: {
      cuit: "30123456789",
      name: "Mi Empresa S.A."
    },
    issueDate: "2025-09-01",
    dueDate: "2025-10-01",
    items: [
      {
        code: "PROD001",
        description: "Producto de ejemplo",
        quantity: 2,
        unitPrice: 1000,
        netAmount: 2000
      }
    ],
    subtotal: 2000,
    iva: 420,
    perceptions: [
      {
        id: "perc1",
        description: "IIBB",
        amount: 60
      }
    ],
    total: 2480,
    status: "pending_approval"
  }
]

export default function InvoicesPage({ params }: { params: { companyId: string } }) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Facturas</h1>
      <Dialog 
        open={!!selectedInvoice}
        onOpenChange={(open: boolean) => !open && setSelectedInvoice(null)}
      >
        <DialogContent className="max-w-4xl">
          <InvoiceDetails invoice={selectedInvoice} />
        </DialogContent>
      </Dialog>
      <InvoicesDataTable 
        columns={columns} 
        data={invoices}
        meta={{
          showDetails: (invoice: Invoice) => setSelectedInvoice(invoice)
        }}
      />
    </div>
  )
}