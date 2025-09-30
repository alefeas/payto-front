'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InvoiceItem } from "@/types/invoice"
import { Plus, Trash2 } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

interface InvoiceItemsProps {
  form: UseFormReturn<any>
  updateTotals: (items: InvoiceItem[]) => void
}

export function InvoiceItems({ form, updateTotals }: InvoiceItemsProps) {
  const items = form.watch("items") || []

  const addItem = () => {
    const currentItems = form.getValues("items") || []
    form.setValue("items", [
      ...currentItems,
      { code: "", description: "", quantity: 1, unitPrice: 0, netAmount: 0 },
    ])
  }

  const removeItem = (index: number) => {
    const currentItems = form.getValues("items")
    const newItems = currentItems.filter((_: any, i: number) => i !== index)
    form.setValue("items", newItems)
    updateTotals(newItems)
  }

  const updateNetAmount = (index: number) => {
    const currentItems = form.getValues("items")
    const item = currentItems[index]
    const netAmount = item.quantity * item.unitPrice
    form.setValue(`items.${index}.netAmount`, netAmount)
    updateTotals(currentItems)
  }

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Items de la Factura</h3>
        <Button type="button" onClick={addItem} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Agregar Item
        </Button>
      </div>

      {items.map((_: any, index: number) => (
        <div key={index} className="grid grid-cols-12 gap-4 mb-4">
          <FormField
            control={form.control}
            name={`items.${index}.code`}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Código</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`items.${index}.description`}
            render={({ field }) => (
              <FormItem className="col-span-4">
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`items.${index}.quantity`}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    {...field}
                    onChange={(e) => {
                      field.onChange(parseInt(e.target.value))
                      updateNetAmount(index)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`items.${index}.unitPrice`}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Precio Unit.</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    {...field}
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value))
                      updateNetAmount(index)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`items.${index}.netAmount`}
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Importe</FormLabel>
                <div className="h-10 flex items-center">
                  ${field.value?.toFixed(2) || "0.00"}
                </div>
              </FormItem>
            )}
          />
          <div className="col-span-1 flex items-center justify-end pt-6">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeItem(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </Card>
  )
}