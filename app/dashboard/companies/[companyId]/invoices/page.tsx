'use client'

import { useState } from "react"
import { InvoicesDataTable } from "@/components/invoices/InvoicesDataTable"
import { columns } from "@/components/invoices/columns"
import { InvoiceDetails } from "@/components/invoices/InvoiceDetails"
import { type Invoice } from "@/types/invoice"
import { Dialog, DialogContent } from "@/components/ui/dialog"

import { mockInvoices } from "@/mocks/invoices"

// Usamos los datos de prueba - Reemplazar con datos reales del backend cuando esté disponible
const invoices: Invoice[] = mockInvoices

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