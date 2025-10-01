export type BusinessRelationType = 'provider' | 'client' | 'partner';

export interface BusinessRelation {
    id: string;
    companyId: string;
    relatedCompanyId: string;
    type: BusinessRelationType;
    status: 'pending' | 'active' | 'rejected';
    createdAt: string;
    updatedAt: string;
}

export interface LegalOffice {
    street: string;
    postalCode: string;
    country: string;
    city: string;
    phone: string;
}

export interface ContactPerson {
    name: string;
    position: string;
    phone: string;
    email: string;
}

export interface BankAccount {
    accountHolder: string;
    accountNumber: string;
    cbu: string;
    accountType: 'checking' | 'savings';
    branch: string;
    country: string;
}

export interface Company {
    id: string;
    name: string;
    cuit: string;
    industry: string;
    logo?: string;
    legalOffice: LegalOffice;
    contact: ContactPerson;
    bankAccount?: BankAccount;
    joinCode: string;
    createdBy: string;
    members: string[];
    businessRelations?: BusinessRelation[];
    businessName?: string;
}

export interface CreateCompanyData {
    name: string;
    cuit: string;
    industry: string;
    logo?: string;
    legalOffice: LegalOffice;
    contact: ContactPerson;
    bankAccount?: BankAccount;
}

export interface JoinCompanyData {
    joinCode: string;
}