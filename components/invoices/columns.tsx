  "use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, ArrowUp, ArrowDown } from "lucide-react"
import jsPDF from 'jspdf'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Invoice } from "@/types/invoice"

const SortableHeader = ({ column, children }: { column: any, children: React.ReactNode }) => {
    const sort = column.getIsSorted();
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(sort === "asc")}
        >
            {children}
            {sort === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : sort === 'desc' ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
    )
}

const downloadPdf = (invoice: Invoice) => {
    const doc = new jsPDF();
    doc.text(`Factura: ${invoice.invoiceNumber}`, 10, 10);
    doc.text(`Tipo: ${invoice.invoiceType}`, 10, 20);
    doc.text(`Proveedor: ${invoice.provider.name} (CUIT: ${invoice.provider.cuit})`, 10, 30);
    doc.text(`Fecha de Emisión: ${invoice.issueDate}`, 10, 40);
    doc.text(`Fecha de Vencimiento: ${invoice.dueDate}`, 10, 50);
    doc.text('Items:', 10, 60);
    let y = 70;
    invoice.items.forEach((item, index) => {
        doc.text(`${item.code} - ${item.description} - Cant: ${item.quantity} - Precio: ${item.unitPrice} - Neto: ${item.netAmount}`, 10, y);
        y += 10;
    });
    doc.text(`Subtotal: ${invoice.subtotal}`, 10, y);
    doc.text(`IVA: ${invoice.iva}`, 10, y + 10);
    doc.text(`Percepciones: ${invoice.percepciones}`, 10, y + 20);
    doc.text(`Total: ${invoice.total}`, 10, y + 30);
    doc.save(`Factura-${invoice.invoiceNumber}.pdf`);
};

const payInvoice = (invoice: Invoice) => {
    // Placeholder: In future, call API to pay invoice
    alert(`Pagando factura ${invoice.invoiceNumber}. Funcionalidad completa cuando el backend esté listo.`);
};

const approveInvoice = (invoice: Invoice) => {
    // Placeholder: In future, call API to approve invoice based on role
    alert(`Aprobando factura ${invoice.invoiceNumber}. Funcionalidad completa cuando el backend esté listo.`);
};

interface ColumnMeta {
  showDetails: (invoice: Invoice) => void;
}

export const columns: ColumnDef<Invoice, any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "invoiceNumber",
    header: "Nro. Factura",
  },
  {
    id: "provider",
    accessorFn: (row) => row.provider.name,
    header: ({ column }) => <SortableHeader column={column}>Proveedor</SortableHeader>,
  },
  {
    accessorKey: "issueDate",
    header: ({ column }) => <SortableHeader column={column}>Fecha de Emisión</SortableHeader>,
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => <SortableHeader column={column}>Fecha de Vencimiento</SortableHeader>,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
        <div className="text-right w-full">
            <SortableHeader column={column}>Monto</SortableHeader>
        </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"))
      const formatted = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column}>Estado</SortableHeader>,
    cell: ({ row }) => {
        const status = row.getValue("status") as string;
        let statusClass = "";
        switch (status) {
            case "paid":
                statusClass = "text-green-500 bg-green-100";
                break;
            case "pending":
                statusClass = "text-yellow-500 bg-yellow-100";
                break;
            case "overdue":
                statusClass = "text-red-500 bg-red-100";
                break;
        }
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
            {status === 'paid' ? 'Pagada' : status === 'pending' ? 'Pendiente' : 'Vencida'}
        </span>;
    }
  },
  {
    id: "actions",
    cell: ({ row, column }) => {
      const invoice = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(invoice.id)}
            >
              Copiar ID de factura
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => (column.columnDef.meta as ColumnMeta).showDetails(invoice)}>Ver detalles</DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadPdf(invoice)}>Descargar PDF</DropdownMenuItem>
            <DropdownMenuItem onClick={() => payInvoice(invoice)}>Pagar factura</DropdownMenuItem>
            <DropdownMenuItem onClick={() => approveInvoice(invoice)}>Aprobar factura</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
