'use client'

import { InvoiceUploadForm } from "@/components/invoices/InvoiceUploadForm"

export default function UploadInvoicePage({ params }: { params: { companyId: string } }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Subir Factura</h1>
      <InvoiceUploadForm companyId={params.companyId} />
    </div>
  )
}