'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { CompanyList } from '@/components/companies/CompanyList';
import { Company, CreateCompanyData, JoinCompanyData } from '@/types/company';

// Simulamos algunas empresas para desarrollo
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

export default function Dashboard() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [companies, setCompanies] = useState<Company[]>(mockCompanies);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    const handleCreateCompany = async (data: CreateCompanyData) => {
        // Aquí iría la llamada a la API
        console.log('Creating company:', data);
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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <CompanyList
                companies={companies}
                onCreateCompany={handleCreateCompany}
                onJoinCompany={handleJoinCompany}
            />
        </div>
    );
}