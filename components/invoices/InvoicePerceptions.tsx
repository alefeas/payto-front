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
import { InvoicePerception } from "@/types/invoice"
import { Plus, Trash2 } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { v4 as uuidv4 } from 'uuid'

interface InvoicePerceptionsProps {
  form: UseFormReturn<any>
  updateTotals: (perceptions: InvoicePerception[]) => void
}

export function InvoicePerceptions({
  form,
  updateTotals,
}: InvoicePerceptionsProps) {
  const perceptions = form.watch("perceptions") || []

  const addPerception = () => {
    const currentPerceptions = form.getValues("perceptions") || []
    form.setValue("perceptions", [
      ...currentPerceptions,
      { id: uuidv4(), description: "", amount: 0 },
    ])
  }

  const removePerception = (id: string) => {
    const currentPerceptions = form.getValues("perceptions")
    const newPerceptions = currentPerceptions.filter((p: InvoicePerception) => p.id !== id)
    form.setValue("perceptions", newPerceptions)
    updateTotals(newPerceptions)
  }

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Percepciones</h3>
        <Button type="button" onClick={addPerception} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Agregar Percepción
        </Button>
      </div>

      {perceptions.map((perception: InvoicePerception) => (
        <div key={perception.id} className="grid grid-cols-12 gap-4 mb-4">
          <FormField
            control={form.control}
            name={`perceptions.${perceptions.findIndex(
              (p: InvoicePerception) => p.id === perception.id
            )}.description`}
            render={({ field }) => (
              <FormItem className="col-span-8">
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
            name={`perceptions.${perceptions.findIndex(
              (p: InvoicePerception) => p.id === perception.id
            )}.amount`}
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Importe</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    {...field}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0
                      field.onChange(value)
                      const currentPerceptions = form.getValues("perceptions")
                      updateTotals(currentPerceptions)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-1 flex items-center justify-end pt-6">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removePerception(perception.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </Card>
  )
}