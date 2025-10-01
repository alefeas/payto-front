'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InvoiceShare, InvoiceShareResponse } from '@/types/invoice-sharing';
import { Invoice } from '@/types/invoice';

interface ReviewInvoiceDialogProps {
  invoiceShare: InvoiceShare;
  invoice: Invoice;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRespond: (response: InvoiceShareResponse) => Promise<void>;
}

export function ReviewInvoiceDialog({
  invoiceShare,
  invoice,
  open,
  onOpenChange,
  onRespond
}: ReviewInvoiceDialogProps) {
  const [rejectionReason, setRejectionReason] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResponse = async (accepted: boolean) => {
    if (!accepted && !rejectionReason) {
      setError('Debes proporcionar un motivo para rechazar la factura');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onRespond({
        accepted,
        rejectionReason: accepted ? undefined : rejectionReason,
        notes: notes || undefined
      });
      onOpenChange(false);
    } catch (err) {
      setError('Error al procesar la respuesta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Revisar Factura Recibida</DialogTitle>
          <DialogDescription>
            Revisa los detalles y acepta o rechaza la factura de {invoiceShare.senderName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Detalles básicos de la factura */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Número de Factura</Label>
              <div className="text-sm">{invoice.invoiceNumber}</div>
            </div>
            <div>
              <Label>Monto Total</Label>
              <div className="text-sm">${invoice.total.toFixed(2)}</div>
            </div>
          </div>

          {/* Notas del remitente si existen */}
          {invoiceShare.notes && (
            <div className="space-y-2">
              <Label>Notas del Remitente</Label>
              <div className="text-sm bg-muted p-2 rounded">
                {invoiceShare.notes}
              </div>
            </div>
          )}

          {/* Campo para razón de rechazo */}
          <div className="space-y-2">
            <Label>Razón de Rechazo</Label>
            <Textarea
              placeholder="Explica por qué rechazas esta factura..."
              value={rejectionReason}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRejectionReason(e.target.value)}
            />
          </div>

          {/* Notas adicionales */}
          <div className="space-y-2">
            <Label>Notas Adicionales (opcional)</Label>
            <Textarea
              placeholder="Agregar notas o comentarios..."
              value={notes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleResponse(false)}
              disabled={loading}
            >
              Rechazar
            </Button>
            <Button
              type="button"
              onClick={() => handleResponse(true)}
              disabled={loading}
            >
              Aceptar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}