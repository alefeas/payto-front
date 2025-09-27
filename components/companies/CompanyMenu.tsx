'use client';

import { useState } from 'react';
import { Company } from '@/types/company';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Database, ChartBar, Users, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CompanyMenuProps {
    company: Company;
}

export function CompanyMenu({ company }: CompanyMenuProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleNavigate = (href: string) => {
        setIsOpen(false); // Cerrar el menú
        router.push(href);
    };

    const menuItems = [
        {
            label: 'Subir Factura',
            icon: Upload,
            href: `/dashboard/companies/${company.id}/upload-invoice`
        },
        {
            label: 'Facturas',
            icon: FileText,
            href: `/dashboard/companies/${company.id}/invoices`
        },
        {
            label: 'Documentos TXT',
            icon: Database,
            href: `/dashboard/companies/${company.id}/documents`
        },
        {
            label: 'Estadísticas',
            icon: ChartBar,
            href: `/dashboard/companies/${company.id}/statistics`
        },
        {
            label: 'Proveedores',
            icon: Users,
            href: `/dashboard/companies/${company.id}/providers`
        },
        {
            label: 'Proyección de Pagos',
            icon: Calendar,
            href: `/dashboard/companies/${company.id}/payment-projection`
        }
    ];

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="w-full justify-start h-auto py-4 px-6">
                    <div className="text-left">
                        <div className="font-medium">{company.name}</div>
                        <div className="text-sm text-muted-foreground">{company.businessName}</div>
                    </div>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                    <SheetTitle>{company.name}</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    {menuItems.map((item) => (
                        <Button 
                            key={item.href}
                            variant="ghost" 
                            className="w-full justify-start gap-2"
                            onClick={() => handleNavigate(item.href)}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Button>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}