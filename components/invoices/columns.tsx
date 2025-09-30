"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Invoice } from "@/types/invoice"
import { Button } from "@/components/ui/button"
import { Check, Copy, Download, Eye, File, MoreHorizontal } from "lucide-react"
import { format } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoiceType",
    header: "Tipo",
  },
  {
    accessorKey: "invoiceNumber",
    header: "Número",
    cell: ({ row }) => {
      const invoice = row.original
      return (
        <div className="flex items-center gap-2">
          <span>{invoice.invoiceNumber}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => {
              navigator.clipboard.writeText(invoice.invoiceNumber)
            }}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: "client.name",
    header: "Cliente",
    cell: ({ row }) => {
      const invoice = row.original
      return (
        <div>
          <div>{invoice.client.name}</div>
          <div className="text-sm text-muted-foreground">
            CUIT: {invoice.client.cuit}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "issueDate",
    header: "Fecha de Emisión",
    cell: ({ row }) => format(new Date(row.getValue("issueDate")), "dd/MM/yyyy"),
  },
  {
    accessorKey: "dueDate",
    header: "Vencimiento",
    cell: ({ row }) => format(new Date(row.getValue("dueDate")), "dd/MM/yyyy"),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => <span>${row.getValue<number>("total").toFixed(2)}</span>,
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
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

      const statusInfo = statusMap[status]
      return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
    },
    filterFn: (row, id, value) => {
      return value ? row.getValue(id) === value : true
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const invoice = row.original
      const { showDetails } = table.options.meta as { showDetails: (invoice: Invoice) => void }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => showDetails(invoice)}>
              <Eye className="mr-2 h-4 w-4" />
              Ver Detalles
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // TODO: Implementar cuando esté el backend
                console.log("Download PDF", invoice.id)
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar PDF
            </DropdownMenuItem>
            {invoice.status === "pending_approval" && (
              <DropdownMenuItem
                onClick={() => {
                  // TODO: Implementar cuando esté el backend
                  console.log("Approve invoice", invoice.id)
                }}
              >
                <Check className="mr-2 h-4 w-4" />
                Aprobar Factura
              </DropdownMenuItem>
            )}
            {(invoice.status === "approved" || invoice.status === "overdue") && (
              <DropdownMenuItem
                onClick={() => {
                  // TODO: Implementar cuando esté el backend
                  console.log("Pay invoice", invoice.id)
                }}
              >
                <File className="mr-2 h-4 w-4" />
                Registrar Pago
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]