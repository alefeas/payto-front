'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from './countries'; // We'll create this data file next

interface LegalOfficeSectionProps {
    street: string;
    postalCode: string;
    country: string;
    city: string;
    phone: string;
    contactName: string;
    contactPosition: string;
    contactPhone: string;
    contactEmail: string;
    onChange: (field: string, value: string) => void;
}

export function LegalOfficeSection({
    street,
    postalCode,
    country,
    city,
    phone,
    contactName,
    contactPosition,
    contactPhone,
    contactEmail,
    onChange,
}: LegalOfficeSectionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Oficina Legal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="street">Dirección</Label>
                    <Input
                        id="street"
                        value={street}
                        onChange={(e) => onChange('legalOffice.street', e.target.value)}
                        placeholder="Calle y número"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="postalCode">Código Postal</Label>
                    <Input
                        id="postalCode"
                        value={postalCode}
                        onChange={(e) => onChange('legalOffice.postalCode', e.target.value)}
                        placeholder="XXXX"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="country">País</Label>
                        <Select
                            value={country}
                            onValueChange={(value) => onChange('legalOffice.country', value)}
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

                    <div className="space-y-2">
                        <Label htmlFor="city">Ciudad</Label>
                        <Input
                            id="city"
                            value={city}
                            onChange={(e) => onChange('legalOffice.city', e.target.value)}
                            placeholder="Ciudad"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => onChange('legalOffice.phone', e.target.value)}
                        placeholder="+54 XXX XXXXXXX"
                        required
                    />
                </div>

                <div className="border-t pt-4 mt-4">
                    <h4 className="text-sm font-medium mb-4">Información de Contacto</h4>
                    
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="contactName">Nombre del Contacto</Label>
                            <Input
                                id="contactName"
                                value={contactName}
                                onChange={(e) => onChange('contact.name', e.target.value)}
                                placeholder="Nombre completo"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contactPosition">Cargo</Label>
                            <Input
                                id="contactPosition"
                                value={contactPosition}
                                onChange={(e) => onChange('contact.position', e.target.value)}
                                placeholder="Ej: Gerente, Director"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contactPhone">Teléfono de Contacto</Label>
                            <Input
                                id="contactPhone"
                                value={contactPhone}
                                onChange={(e) => onChange('contact.phone', e.target.value)}
                                placeholder="+54 XXX XXXXXXX"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contactEmail">Email de Contacto</Label>
                            <Input
                                id="contactEmail"
                                type="email"
                                value={contactEmail}
                                onChange={(e) => onChange('contact.email', e.target.value)}
                                placeholder="contacto@empresa.com"
                                required
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}