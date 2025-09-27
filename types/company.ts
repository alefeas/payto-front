export interface Company {
    id: string;
    name: string;
    businessName: string; // Razón social
    taxId: string;       // CUIT/NIT
    bankAccount: {
        accountNumber: string;
        bankName: string;
        accountType: 'checking' | 'savings';
    };
    joinCode: string;    // Código para unirse a la empresa
    createdBy: string;   // ID del usuario que creó la empresa
    members: string[];   // IDs de los miembros
}

export interface CreateCompanyData {
    name: string;
    businessName: string;
    taxId: string;
    bankAccount: {
        accountNumber: string;
        bankName: string;
        accountType: 'checking' | 'savings';
    };
}

export interface JoinCompanyData {
    joinCode: string;
}