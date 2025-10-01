'use client'

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Invoice } from "@/types/invoice"
import { TransferInvoiceDialog } from "./TransferInvoiceDialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InvoiceFormData, InvoiceType } from "@/types/invoice"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { InvoiceItems } from "@/components/invoices/InvoiceItems"
import { InvoicePerceptions } from "@/components/invoices/InvoicePerceptions"
import { mockBusinessNetwork } from "@/mocks/business-network"

const formSchema = z.object({
  invoiceType: z.enum(['A', 'B', 'C'] as const),
  invoiceNumber: z.string().min(1, "El número de factura es requerido"),
  issueDate: z.date(),
  dueDate: z.date(),
  client: z.object({
    cuit: z.string().min(11, "El CUIT debe tener 11 dígitos").max(11),
    name: z.string().min(1, "El nombre del cliente es requerido"),
  }),
  items: z.array(z.object({
    code: z.string().min(1, "El código es requerido"),
    description: z.string().min(1, "La descripción es requerida"),
    quantity: z.number().min(1, "La cantidad debe ser mayor a 0"),
    unitPrice: z.number().min(0, "El precio debe ser mayor o igual a 0"),
    netAmount: z.number(),
  })).min(1, "Debe agregar al menos un ítem"),
  iva: z.number().min(0, "El IVA debe ser mayor o igual a 0"),
  perceptions: z.array(z.object({
    id: z.string(),
    description: z.string().min(1, "La descripción es requerida"),
    amount: z.number().min(0, "El monto debe ser mayor o igual a 0"),
  })),
})

interface InvoiceUploadFormProps {
  companyId: string;
}

export function InvoiceUploadForm({ companyId }: InvoiceUploadFormProps) {
  const [subtotal, setSubtotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [showTransferDialog, setShowTransferDialog] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [],
      perceptions: [],
      iva: 0,
      issueDate: new Date(),
      dueDate: new Date(),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Implementar cuando esté el backend
    console.log(values)
  }

  const updateTotals = (items: any[], iva: number, perceptions: any[]) => {
    const newSubtotal = items.reduce((acc, item) => acc + item.netAmount, 0)
    setSubtotal(newSubtotal)

    const perceptionsTotal = perceptions.reduce((acc, p) => acc + p.amount, 0)
    setTotal(newSubtotal + iva + perceptionsTotal)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="invoiceType"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Tipo de Factura</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="A">Factura A</SelectItem>
                    <SelectItem value="B">Factura B</SelectItem>
                    <SelectItem value="C">Factura C</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="invoiceNumber"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Número de Factura</FormLabel>
                <FormControl>
                  <Input placeholder="0001-00000001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="issueDate"
            render={({ field }: { field: any }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de Facturación</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Seleccione una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }: { field: any }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de Vencimiento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Seleccione una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) =>
                        date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Información del Cliente</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="client.cuit"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>CUIT</FormLabel>
                  <FormControl>
                    <Input placeholder="30712345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="client.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del cliente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <InvoiceItems
          form={form}
          updateTotals={(items: z.infer<typeof formSchema>["items"]) =>
            updateTotals(items, form.getValues("iva"), form.getValues("perceptions"))
          }
        />

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <InvoicePerceptions
              form={form}
              updateTotals={(perceptions: z.infer<typeof formSchema>["perceptions"]) =>
                updateTotals(
                  form.getValues("items"),
                  form.getValues("iva"),
                  perceptions
                )
              }
            />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <span className="font-semibold">Subtotal:</span>
              <span className="text-right">${subtotal.toFixed(2)}</span>
            </div>
            <FormField
              control={form.control}
              name="iva"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>IVA</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      {...field}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = parseFloat(e.target.value) || 0
                        field.onChange(value)
                        updateTotals(
                          form.getValues("items"),
                          value,
                          form.getValues("perceptions")
                        )
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2 pt-4 border-t">
              <span className="font-semibold">Total:</span>
              <span className="text-right font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="submit" variant="outline">Solo Guardar</Button>
          <Button type="submit" onClick={(e) => {
            e.preventDefault();
            // Primero abrimos el diálogo de transferencia
            setShowTransferDialog(true);
          }}>
            Guardar y Transferir
          </Button>
        </div>

        <TransferInvoiceDialog
          invoice={currentInvoice}
          open={showTransferDialog}
          onOpenChange={setShowTransferDialog}
          onTransfer={async (recipientId: string) => {
            try {
              const formData = form.getValues();
              // Primero guardamos la factura
              const response = await new Promise<Invoice>((resolve) => {
                console.log('Saving invoice for company:', companyId);
                setTimeout(() => {
                  resolve({
                    id: '123',
                    invoiceType: formData.invoiceType,
                    invoiceNumber: formData.invoiceNumber,
                    issueDate: formData.issueDate.toISOString(),
                    dueDate: formData.dueDate.toISOString(),
                    client: formData.client,
                    provider: {
                      cuit: '30-12345678-9',
                      name: 'Mi Empresa'
                    },
                    items: formData.items,
                    iva: formData.iva,
                    perceptions: formData.perceptions,
                    subtotal,
                    total,
                    status: 'pending_approval'
                  });
                }, 1000);
              });

              // Luego simulamos la transferencia
              await new Promise(resolve => {
                const selectedCompany = mockBusinessNetwork.find(c => c.id === recipientId);
                console.log(`Transferring invoice ${response.invoiceNumber} to ${selectedCompany?.name}`);
                setTimeout(resolve, 1000);
              });
              
              setShowTransferDialog(false);
              // Reiniciamos el formulario después de una transferencia exitosa
              form.reset();
              setSubtotal(0);
              setTotal(0);
            } catch (error) {
              console.error('Error saving/transferring invoice:', error);
            }
          }}
        />
      </form>
    </Form>
  )
}