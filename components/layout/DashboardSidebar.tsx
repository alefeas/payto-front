'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, UserPlus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CreateCompanyModal } from '@/components/companies/CreateCompanyModal';
import { JoinCompanyModal } from '@/components/companies/JoinCompanyModal';
import { CompanyMenu } from '@/components/companies/CompanyMenu';
import { Company, CreateCompanyData, JoinCompanyData } from '@/types/company';

// Mock data for companies - replace with real data later
const mockCompanies: Company[] = [
    {
        id: '1',
        name: 'Empresa de Prueba 1',
        businessName: 'Empresa de Prueba S.A.',
        taxId: '30-12345678-9',
        bankAccount: {
            accountNumber: '123456789',
            bankName: 'Banco de Prueba',
            accountType: 'checking',
        },
        joinCode: 'ABC123',
        createdBy: 'user1',
        members: ['user1'],
    },
];

export function DashboardSidebar() {
    const [companies, setCompanies] = useState<Company[]>(mockCompanies);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);

    const handleCreateCompany = async (data: CreateCompanyData) => {
        // Aquí iría la llamada a la API
        const newCompany: Company = {
            id: Date.now().toString(),
            ...data,
            joinCode: Math.random().toString(36).substring(7),
            createdBy: 'currentUserId',
            members: ['currentUserId'],
        };
        setCompanies([...companies, newCompany]);
    };

    const handleJoinCompany = async (data: JoinCompanyData) => {
        // Aquí iría la llamada a la API
        console.log('Joining company with code:', data.joinCode);
        // Simular error si el código no coincide con ninguna empresa
        const company = companies.find(c => c.joinCode === data.joinCode);
        if (!company) {
            throw new Error('Código de invitación inválido');
        }
    };

    return (
        <div className="w-64 border-r bg-gray-50/40 min-h-[calc(100vh-4rem)]">
            <div className="space-y-4 py-4">
                <div className="px-3 space-y-2">
                    <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => setShowCreateModal(true)}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Crear Empresa
                    </Button>
                    <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => setShowJoinModal(true)}
                    >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Unirse a Empresa
                    </Button>
                </div>
                
                <Separator />

                <div className="px-3">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Mis Empresas
                    </h2>
                    <ScrollArea className="h-[calc(100vh-12rem)]">
                        <div className="space-y-1">
                            {companies.map((company) => (
                                <CompanyMenu key={company.id} company={company} />
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>

            <CreateCompanyModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreateCompany}
            />

            <JoinCompanyModal
                isOpen={showJoinModal}
                onClose={() => setShowJoinModal(false)}
                onSubmit={handleJoinCompany}
            />
        </div>
    );
}