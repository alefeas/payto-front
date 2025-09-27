'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreateCompanyData } from '@/types/company';

interface CreateCompanyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateCompanyData) => Promise<void>;
}

export function CreateCompanyModal({ isOpen, onClose, onSubmit }: CreateCompanyModalProps) {
    const [formData, setFormData] = useState<CreateCompanyData>({
        name: '',
        businessName: '',
        taxId: '',
        bankAccount: {
            accountNumber: '',
            bankName: '',
            accountType: 'checking',
        },
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error('Error creating company:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('bank.')) {
            const bankField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                bankAccount: {
                    ...prev.bankAccount,
                    [bankField]: value,
                },
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Crear Nueva Empresa</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre de la Empresa</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Mi Empresa S.A."
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="businessName">Razón Social</Label>
                        <Input
                            id="businessName"
                            name="businessName"
                            placeholder="Mi Empresa Sociedad Anónima"
                            value={formData.businessName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="taxId">CUIT/NIT</Label>
                        <Input
                            id="taxId"
                            name="taxId"
                            placeholder="XX-XXXXXXXX-X"
                            value={formData.taxId}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Datos Bancarios</h3>
                        
                        <div className="space-y-2">
                            <Label htmlFor="bankName">Banco</Label>
                            <Input
                                id="bankName"
                                name="bank.bankName"
                                placeholder="Nombre del banco"
                                value={formData.bankAccount.bankName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="accountNumber">Número de Cuenta</Label>
                            <Input
                                id="accountNumber"
                                name="bank.accountNumber"
                                placeholder="XXXX-XXXX-XXXX-XXXX"
                                value={formData.bankAccount.accountNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="accountType">Tipo de Cuenta</Label>
                            <Select
                                value={formData.bankAccount.accountType}
                                onValueChange={(value: 'checking' | 'savings') =>
                                    setFormData(prev => ({
                                        ...prev,
                                        bankAccount: {
                                            ...prev.bankAccount,
                                            accountType: value,
                                        },
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona el tipo de cuenta" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="checking">Cuenta Corriente</SelectItem>
                                    <SelectItem value="savings">Caja de Ahorro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" type="button" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Creando..." : "Crear Empresa"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}