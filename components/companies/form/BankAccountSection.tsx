'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from './countries';

interface BankAccountSectionProps {
    accountHolder: string;
    accountNumber: string;
    cbu: string;
    accountType: string;
    branch: string;
    country: string;
    companyName?: string;
    onChange: (field: string, value: string) => void;
}

export function BankAccountSection({
    accountHolder,
    accountNumber,
    cbu,
    accountType,
    branch,
    country,
    companyName,
    onChange,
}: BankAccountSectionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Detalles Bancarios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="accountHolder">Titular de la Cuenta</Label>
                    <Input
                        id="accountHolder"
                        value={accountHolder || companyName}
                        onChange={(e) => onChange('bankAccount.accountHolder', e.target.value)}
                        placeholder="Nombre del titular"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="accountNumber">Número de Cuenta</Label>
                    <Input
                        id="accountNumber"
                        value={accountNumber}
                        onChange={(e) => onChange('bankAccount.accountNumber', e.target.value)}
                        placeholder="Número de cuenta"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="cbu">CBU</Label>
                    <Input
                        id="cbu"
                        value={cbu}
                        onChange={(e) => onChange('bankAccount.cbu', e.target.value)}
                        placeholder="22 dígitos"
                        maxLength={22}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="accountType">Tipo de Cuenta</Label>
                    <Select
                        value={accountType}
                        onValueChange={(value) => onChange('bankAccount.accountType', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo de cuenta" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="checking">Cuenta Corriente</SelectItem>
                            <SelectItem value="savings">Caja de Ahorro</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="branch">Sucursal</Label>
                    <Input
                        id="branch"
                        value={branch}
                        onChange={(e) => onChange('bankAccount.branch', e.target.value)}
                        placeholder="Nombre o número de sucursal"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="bankCountry">País</Label>
                    <Select
                        value={country}
                        onValueChange={(value) => onChange('bankAccount.country', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar país" />
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map((c) => (
                                <SelectItem key={c.code} value={c.code}>
                                    {c.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}