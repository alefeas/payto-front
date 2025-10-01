'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Invoice } from '@/types/invoice'

interface ShareInvoiceDialogProps {
  invoice: Invoice
  open: boolean
  onOpenChange: (open: boolean) => void
  onShare: (recipientId: string, notes?: string) => Promise<void>
}

export function ShareInvoiceDialog({
  invoice,
  open,
  onOpenChange,
  onShare,
}: ShareInvoiceDialogProps) {
  const [notes, setNotes] = useState('')
  const [selectedRecipient, setSelectedRecipient] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleShare = async () => {
    if (!selectedRecipient) return
    
    setIsLoading(true)
    try {
      await onShare(selectedRecipient, notes)
      setNotes('')
      setSelectedRecipient('')
    } catch (error) {
      console.error('Error al compartir la factura:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Compartir Factura</DialogTitle>
          <DialogDescription>
            Selecciona una empresa de tu red de negocios para compartir la factura.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* TODO: Agregar SelectContent cuando esté el endpoint */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Textarea
              id="notes"
              placeholder="Agregar una nota (opcional)"
              className="col-span-4"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleShare}
            disabled={!selectedRecipient || isLoading}
          >
            {isLoading ? 'Compartiendo...' : 'Compartir'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}