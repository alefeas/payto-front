'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { JoinCompanyData } from '@/types/company';

interface JoinCompanyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: JoinCompanyData) => Promise<void>;
}

export function JoinCompanyModal({ isOpen, onClose, onSubmit }: JoinCompanyModalProps) {
    const [joinCode, setJoinCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            await onSubmit({ joinCode });
            onClose();
        } catch (error) {
            setError('Código inválido o empresa no encontrada');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Unirse a una Empresa</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="joinCode">Código de Invitación</Label>
                        <Input
                            id="joinCode"
                            placeholder="Ingresa el código de invitación"
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value)}
                            required
                        />
                        {error && (
                            <p className="text-sm text-destructive">{error}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" type="button" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Uniéndose..." : "Unirse"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}