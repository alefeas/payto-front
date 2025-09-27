'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreateCompanyModal } from './CreateCompanyModal';
import { JoinCompanyModal } from './JoinCompanyModal';
import { Company, CreateCompanyData, JoinCompanyData } from '@/types/company';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CompanyListProps {
    companies: Company[];
    onCreateCompany: (data: CreateCompanyData) => Promise<void>;
    onJoinCompany: (data: JoinCompanyData) => Promise<void>;
}

export function CompanyList({ companies, onCreateCompany, onJoinCompany }: CompanyListProps) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Mis Empresas</h2>
                <div className="space-x-2">
                    <Button onClick={() => setShowCreateModal(true)} variant="default">
                        Crear Empresa
                    </Button>
                    <Button onClick={() => setShowJoinModal(true)} variant="outline">
                        Unirse a Empresa
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {companies.map((company) => (
                    <Card key={company.id}>
                        <CardHeader>
                            <CardTitle>{company.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                {company.businessName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                CUIT/NIT: {company.taxId}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <CreateCompanyModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={onCreateCompany}
            />

            <JoinCompanyModal
                isOpen={showJoinModal}
                onClose={() => setShowJoinModal(false)}
                onSubmit={onJoinCompany}
            />
        </div>
    );
}