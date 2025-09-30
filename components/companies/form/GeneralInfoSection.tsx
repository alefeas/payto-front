'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GeneralInfoSectionProps {
    name: string;
    cuit: string;
    industry: string;
    onChange: (field: string, value: string) => void;
    onFileChange?: (file: File) => void;
}

export function GeneralInfoSection({ name, cuit, industry, onChange, onFileChange }: GeneralInfoSectionProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onFileChange) {
            onFileChange(file);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Datos Generales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre de la Empresa</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => onChange('name', e.target.value)}
                        placeholder="Mi Empresa S.A."
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="cuit">CUIT</Label>
                    <Input
                        id="cuit"
                        value={cuit}
                        onChange={(e) => onChange('cuit', e.target.value)}
                        placeholder="XX-XXXXXXXX-X"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="industry">Industria/Actividad Principal</Label>
                    <Input
                        id="industry"
                        value={industry}
                        onChange={(e) => onChange('industry', e.target.value)}
                        placeholder="Ej: Tecnología, Manufactura, Servicios"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="logo">Logo de la Empresa</Label>
                    <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                    />
                </div>
            </CardContent>
        </Card>
    );
}