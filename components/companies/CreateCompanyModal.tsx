'use client';

import { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CreateCompanyData } from '@/types/company';
import { GeneralInfoSection } from './form/GeneralInfoSection';
import { LegalOfficeSection } from './form/LegalOfficeSection';
import { BankAccountSection } from './form/BankAccountSection';
import { validateCompanyData, ValidationError } from '@/lib/validations/company';
import { Alert, AlertDescription } from '../ui/alert';
import { Steps } from '../ui/steps';
import { validateCUIT, validatePhone, validateEmail, validateCBU } from '@/lib/validations/company';

interface CreateCompanyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateCompanyData) => Promise<void>;
}

const FORM_STEPS = [
    { title: 'Información General' },
    { title: 'Oficina Legal' },
    { title: 'Detalles Bancarios' },
];

export function CreateCompanyModal({ isOpen, onClose, onSubmit }: CreateCompanyModalProps) {
    const [formData, setFormData] = useState<CreateCompanyData>({
        name: '',
        cuit: '',
        industry: '',
        legalOffice: {
            street: '',
            postalCode: '',
            country: '',
            city: '',
            phone: '',
        },
        contact: {
            name: '',
            position: '',
            phone: '',
            email: '',
        }
    });
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [logo, setLogo] = useState<File | null>(null);
    const [errors, setErrors] = useState<ValidationError[]>([]);

    const validateStep = useCallback((step: number): boolean => {
        const newErrors: ValidationError[] = [];

        switch (step) {
            case 0: // General Info
                if (!formData.name?.trim()) {
                    newErrors.push({ field: 'name', message: 'El nombre de la empresa es requerido' });
                }
                if (!formData.cuit || !validateCUIT(formData.cuit)) {
                    newErrors.push({ field: 'cuit', message: 'El CUIT ingresado no es válido' });
                }
                if (!formData.industry?.trim()) {
                    newErrors.push({ field: 'industry', message: 'La industria es requerida' });
                }
                break;

            case 1: // Legal Office
                if (!formData.legalOffice.street?.trim()) {
                    newErrors.push({ field: 'legalOffice.street', message: 'La dirección es requerida' });
                }
                if (!formData.legalOffice.postalCode?.trim()) {
                    newErrors.push({ field: 'legalOffice.postalCode', message: 'El código postal es requerido' });
                }
                if (!formData.legalOffice.country?.trim()) {
                    newErrors.push({ field: 'legalOffice.country', message: 'El país es requerido' });
                }
                if (!formData.legalOffice.city?.trim()) {
                    newErrors.push({ field: 'legalOffice.city', message: 'La ciudad es requerida' });
                }
                if (!validatePhone(formData.legalOffice.phone)) {
                    newErrors.push({ field: 'legalOffice.phone', message: 'El teléfono no es válido' });
                }
                if (!formData.contact.name?.trim()) {
                    newErrors.push({ field: 'contact.name', message: 'El nombre del contacto es requerido' });
                }
                if (!formData.contact.position?.trim()) {
                    newErrors.push({ field: 'contact.position', message: 'El cargo del contacto es requerido' });
                }
                if (!validatePhone(formData.contact.phone)) {
                    newErrors.push({ field: 'contact.phone', message: 'El teléfono del contacto no es válido' });
                }
                if (!validateEmail(formData.contact.email)) {
                    newErrors.push({ field: 'contact.email', message: 'El email del contacto no es válido' });
                }
                break;

            case 2: // Bank Account (opcional)
                if (formData.bankAccount) {
                    if (formData.bankAccount.cbu && !validateCBU(formData.bankAccount.cbu)) {
                        newErrors.push({ field: 'bankAccount.cbu', message: 'El CBU ingresado no es válido' });
                    }
                }
                break;
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    }, [formData]);

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, FORM_STEPS.length - 1));
        }
    };

    const handlePrevious = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
        setErrors([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate current step
        if (!validateStep(currentStep)) {
            return;
        }

        // If we're not on the last step, move to next step
        if (currentStep < FORM_STEPS.length - 1) {
            handleNext();
            return;
        }
        
        setIsLoading(true);
        try {
            // Here you would handle the logo upload separately and get a URL
            const dataToSubmit = {
                ...formData,
                logo: logo ? 'url_to_uploaded_logo' : undefined, // This should be handled by your file upload service
            };
            await onSubmit(dataToSubmit);
            onClose();
        } catch (error) {
            console.error('Error creating company:', error);
            setErrors([{ field: 'submit', message: 'Error al crear la empresa. Por favor, intente nuevamente.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFieldChange = (field: string, value: string) => {
        const fields = field.split('.');
        setFormData((prev) => {
            if (fields.length === 1) {
                return { ...prev, [field]: value };
            }
            
            const [section, key] = fields;
            switch (section) {
                case 'legalOffice':
                    return {
                        ...prev,
                        legalOffice: {
                            ...prev.legalOffice,
                            [key]: value,
                        },
                    };
                case 'contact':
                    return {
                        ...prev,
                        contact: {
                            ...prev.contact,
                            [key]: value,
                        },
                    };
                case 'bankAccount': {
                    const currentBankAccount = prev.bankAccount || {
                        accountHolder: '',
                        accountNumber: '',
                        cbu: '',
                        accountType: 'checking' as const,
                        branch: '',
                        country: ''
                    };
                    return {
                        ...prev,
                        bankAccount: {
                            ...currentBankAccount,
                            [key]: value,
                        },
                    };
                }
                default:
                    return prev;
            }
        });
    };

    const handleLogoChange = (file: File) => {
        setLogo(file);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Crear Nueva Empresa</DialogTitle>
                    <DialogDescription>Complete los datos de su empresa. Los datos bancarios son opcionales.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="mt-6">
                    <Steps steps={FORM_STEPS} currentStep={currentStep} className="mb-6" />
                    
                    {errors.length > 0 && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertDescription>
                                <ul className="list-disc pl-4">
                                    {errors.map((error, index) => (
                                        <li key={index}>{error.message}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="min-h-[400px] mb-6">
                        {currentStep === 0 && (
                            <GeneralInfoSection
                                name={formData.name}
                                cuit={formData.cuit}
                                industry={formData.industry}
                                onChange={handleFieldChange}
                                onFileChange={handleLogoChange}
                            />
                        )}

                        {currentStep === 1 && (
                            <LegalOfficeSection
                                street={formData.legalOffice.street}
                                postalCode={formData.legalOffice.postalCode}
                                country={formData.legalOffice.country}
                                city={formData.legalOffice.city}
                                phone={formData.legalOffice.phone}
                                contactName={formData.contact.name}
                                contactPosition={formData.contact.position}
                                contactPhone={formData.contact.phone}
                                contactEmail={formData.contact.email}
                                onChange={handleFieldChange}
                            />
                        )}

                        {currentStep === 2 && (
                            <BankAccountSection
                                accountHolder={formData.bankAccount?.accountHolder || ''}
                                accountNumber={formData.bankAccount?.accountNumber || ''}
                                cbu={formData.bankAccount?.cbu || ''}
                                accountType={formData.bankAccount?.accountType || 'checking'}
                                branch={formData.bankAccount?.branch || ''}
                                country={formData.bankAccount?.country || ''}
                                companyName={formData.name}
                                onChange={handleFieldChange}
                            />
                        )}
                    </div>

                    <div className="flex justify-between space-x-2 border-t pt-4">
                        <div>
                            <Button 
                                variant="outline" 
                                type="button" 
                                onClick={onClose}
                            >
                                Cancelar
                            </Button>
                        </div>
                        <div className="flex space-x-2">
                            {currentStep > 0 && (
                                <Button 
                                    variant="outline" 
                                    type="button" 
                                    onClick={handlePrevious}
                                >
                                    Anterior
                                </Button>
                            )}
                            <Button 
                                type="submit" 
                                disabled={isLoading}
                            >
                                {currentStep === FORM_STEPS.length - 1 
                                    ? (isLoading ? "Creando..." : "Crear Empresa")
                                    : "Siguiente"
                                }
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}