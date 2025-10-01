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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Invoice } from '@/types/invoice'
import { mockBusinessNetwork } from '@/mocks/business-network'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface TransferInvoiceDialogProps {
  invoice: Invoice | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onTransfer: (recipientId: string) => Promise<void>
}

export function TransferInvoiceDialog({
  invoice,
  open,
  onOpenChange,
  onTransfer,
}: TransferInvoiceDialogProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Filtrar solo empresas conectadas y que coincidan con la búsqueda
  const filteredCompanies = mockBusinessNetwork.filter(company => 
    company.status === 'connected' && 
    (company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     company.cuit.includes(searchTerm))
  )

  const handleTransfer = async () => {
    if (!selectedCompany) return
    
    setIsLoading(true)
    try {
      await onTransfer(selectedCompany)
      setSearchTerm('')
      setSelectedCompany(null)
    } catch (error) {
      console.error('Error al transferir la factura:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Transferir Factura</DialogTitle>
          <DialogDescription>
            Selecciona una empresa de tu red de negocios para transferir la factura {invoice?.invoiceNumber || ''}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder="Buscar por nombre o CUIT..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {filteredCompanies.map((company) => (
                <Card 
                  key={company.id}
                  className={cn(
                    "p-4 cursor-pointer hover:bg-accent transition-colors",
                    selectedCompany === company.id && "border-primary"
                  )}
                  onClick={() => setSelectedCompany(company.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{company.name}</h4>
                      <p className="text-sm text-muted-foreground">CUIT: {company.cuit}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {company.transactionsCount} transacciones
                    </div>
                  </div>
                </Card>
              ))}
              {filteredCompanies.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No se encontraron empresas que coincidan con la búsqueda.
                </p>
              )}
            </div>
          </ScrollArea>
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
            onClick={handleTransfer}
            disabled={!selectedCompany || isLoading}
          >
            {isLoading ? 'Transfiriendo...' : 'Transferir'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}