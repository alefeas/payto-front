import { CreateCompanyData } from '@/types/company';

export const validateCUIT = (cuit: string): boolean => {
    const cleanCUIT = cuit.replace(/[-\s]/g, '');
    
    // Check length
    if (cleanCUIT.length !== 11) {
        return false;
    }

    // Check if it's all numbers
    if (!/^\d+$/.test(cleanCUIT)) {
        return false;
    }

    // Validate check digit
    const multipliers = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    let sum = 0;

    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanCUIT[i]) * multipliers[i];
    }

    const remainder = sum % 11;
    const checkDigit = 11 - remainder;
    const expectedCheckDigit = parseInt(cleanCUIT[10]);

    return checkDigit === expectedCheckDigit;
};

export const validateCBU = (cbu: string): boolean => {
    const cleanCBU = cbu.replace(/[-\s]/g, '');
    
    // Check length
    if (cleanCBU.length !== 22) {
        return false;
    }

    // Check if it's all numbers
    if (!/^\d+$/.test(cleanCBU)) {
        return false;
    }

    return true; // For now, we'll just validate length and numbers
};

export const validatePhone = (phone: string): boolean => {
    // Allow for international format with optional spaces and dashes
    return /^\+?[\d\s-]{8,}$/.test(phone);
};

export const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export interface ValidationError {
    field: string;
    message: string;
}

export const validateCompanyData = (data: CreateCompanyData): ValidationError[] => {
    const errors: ValidationError[] = [];

    // General Info Validation
    if (!data.name || data.name.length < 2) {
        errors.push({ field: 'name', message: 'El nombre de la empresa es requerido y debe tener al menos 2 caracteres' });
    }

    if (!data.cuit || !validateCUIT(data.cuit)) {
        errors.push({ field: 'cuit', message: 'El CUIT ingresado no es válido' });
    }

    if (!data.industry) {
        errors.push({ field: 'industry', message: 'La industria/actividad es requerida' });
    }

    // Legal Office Validation
    if (!data.legalOffice.street) {
        errors.push({ field: 'legalOffice.street', message: 'La dirección es requerida' });
    }

    if (!data.legalOffice.postalCode) {
        errors.push({ field: 'legalOffice.postalCode', message: 'El código postal es requerido' });
    }

    if (!data.legalOffice.country) {
        errors.push({ field: 'legalOffice.country', message: 'El país es requerido' });
    }

    if (!data.legalOffice.city) {
        errors.push({ field: 'legalOffice.city', message: 'La ciudad es requerida' });
    }

    if (!validatePhone(data.legalOffice.phone)) {
        errors.push({ field: 'legalOffice.phone', message: 'El teléfono no es válido' });
    }

    // Contact Validation
    if (!data.contact.name) {
        errors.push({ field: 'contact.name', message: 'El nombre del contacto es requerido' });
    }

    if (!data.contact.position) {
        errors.push({ field: 'contact.position', message: 'El cargo del contacto es requerido' });
    }

    if (!validatePhone(data.contact.phone)) {
        errors.push({ field: 'contact.phone', message: 'El teléfono del contacto no es válido' });
    }

    if (!validateEmail(data.contact.email)) {
        errors.push({ field: 'contact.email', message: 'El email del contacto no es válido' });
    }

    // Bank Account Validation (Optional)
    if (data.bankAccount) {
        if (!data.bankAccount.accountHolder) {
            errors.push({ field: 'bankAccount.accountHolder', message: 'El titular de la cuenta es requerido' });
        }

        if (!data.bankAccount.accountNumber) {
            errors.push({ field: 'bankAccount.accountNumber', message: 'El número de cuenta es requerido' });
        }

        if (data.bankAccount.cbu && !validateCBU(data.bankAccount.cbu)) {
            errors.push({ field: 'bankAccount.cbu', message: 'El CBU ingresado no es válido' });
        }

        if (!data.bankAccount.accountType) {
            errors.push({ field: 'bankAccount.accountType', message: 'El tipo de cuenta es requerido' });
        }

        if (!data.bankAccount.branch) {
            errors.push({ field: 'bankAccount.branch', message: 'La sucursal es requerida' });
        }

        if (!data.bankAccount.country) {
            errors.push({ field: 'bankAccount.country', message: 'El país de la cuenta es requerido' });
        }
    }

    return errors;
};