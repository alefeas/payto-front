'use client';

import { useState } from 'react';
import { BusinessRelation, BusinessRelationType, Company } from '@/types/company';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CompanyCard } from './CompanyCard';
import { UserPlus, Users } from 'lucide-react';
import { mockBusinessNetwork } from '@/mocks/business-network'

const requestFormSchema = z.object({
  companyTaxId: z.string().min(11, "El CUIT debe tener 11 dígitos"),
  type: z.enum(['provider', 'client', 'partner']),
});

type RelationType = {
  value: BusinessRelationType;
  label: string;
  description: string;
};

const relationTypes: RelationType[] = [
  {
    value: 'provider',
    label: 'Proveedor',
    description: 'Empresa que te provee bienes o servicios'
  },
  {
    value: 'client',
    label: 'Cliente',
    description: 'Empresa a la que le provees bienes o servicios'
  },
  {
    value: 'partner',
    label: 'Socio',
    description: 'Empresa con la que tienes una relación de colaboración'
  }
];

// Convertir los datos de mockBusinessNetwork al formato de BusinessRelation
const mockRelations: BusinessRelation[] = mockBusinessNetwork.map(company => ({
  id: company.id,
  companyId: '1', // ID de nuestra empresa
  relatedCompanyId: company.id,
  type: 'provider', // Por defecto, se puede ajustar según la lógica de negocio
  status: company.status === 'connected' ? 'active' : 'pending',
  createdAt: company.connectionDate,
  updatedAt: company.lastTransaction || company.connectionDate
}));

export function BusinessNetwork() {
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('active');

  const form = useForm<z.infer<typeof requestFormSchema>>({
    resolver: zodResolver(requestFormSchema),
  });

  const handleSubmit = async (values: z.infer<typeof requestFormSchema>) => {
    // Aquí iría la llamada al backend
    console.log(values);
    setShowRequestDialog(false);
    form.reset();
  };

  const getRelatedCompany = (relatedCompanyId: string) => {
    return mockBusinessNetwork.find(company => company.id === relatedCompanyId);
  };



  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Red Empresarial</h2>
        <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Nueva Relación
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Solicitar Nueva Relación</DialogTitle>
              <DialogDescription>
                Ingresa los datos de la empresa con la que deseas establecer una relación comercial.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyTaxId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CUIT de la empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="30123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de relación</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo de relación" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {relationTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit">Enviar Solicitud</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Activas</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          {mockRelations
            .filter(relation => relation.status === 'active')
            .map(relation => {
              const relatedCompany = getRelatedCompany(relation.relatedCompanyId);
              if (!relatedCompany) return null;

              return (
                <CompanyCard
                  key={relation.id}
                  company={relatedCompany}
                  relation={relation}
                  relationTypes={relationTypes}
                />
              );
            })}
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          {mockRelations
            .filter(relation => relation.status === 'pending')
            .map(relation => {
              const relatedCompany = getRelatedCompany(relation.relatedCompanyId);
              if (!relatedCompany) return null;

              return (
                <CompanyCard
                  key={relation.id}
                  company={relatedCompany}
                  relation={relation}
                  relationTypes={relationTypes}
                  isPending
                />
              );
            })}
        </TabsContent>
      </Tabs>
    </div>
  );
}