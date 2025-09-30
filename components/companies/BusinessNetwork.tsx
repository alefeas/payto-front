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
import { Badge } from '@/components/ui/badge';
import { UserPlus, Users } from 'lucide-react';

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

const mockRelations: BusinessRelation[] = [
  {
    id: '1',
    companyId: '1',
    relatedCompanyId: '2',
    type: 'provider',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockRelatedCompanies: Company[] = [
  {
    id: '2',
    name: 'Empresa Proveedora S.A.',
    businessName: 'Empresa Proveedora S.A.',
    taxId: '30-98765432-1',
    bankAccount: {
      accountNumber: '987654321',
      bankName: 'Banco Proveedor',
      accountType: 'checking',
    },
    joinCode: 'XYZ789',
    createdBy: 'user2',
    members: ['user2'],
  }
];

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
    return mockRelatedCompanies.find(company => company.id === relatedCompanyId);
  };

  const getStatusBadge = (status: BusinessRelation['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary">Activa</Badge>;
      case 'pending':
        return <Badge variant="outline">Pendiente</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rechazada</Badge>;
    }
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
                <Card key={relation.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{relatedCompany.name}</h3>
                      <p className="text-sm text-muted-foreground">{relatedCompany.taxId}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">
                          {relationTypes.find(t => t.value === relation.type)?.label}
                        </span>
                      </div>
                    </div>
                    {getStatusBadge(relation.status)}
                  </div>
                </Card>
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
                <Card key={relation.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{relatedCompany.name}</h3>
                      <p className="text-sm text-muted-foreground">{relatedCompany.taxId}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">
                          {relationTypes.find(t => t.value === relation.type)?.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Rechazar</Button>
                      <Button size="sm">Aceptar</Button>
                    </div>
                  </div>
                </Card>
              );
            })}
        </TabsContent>
      </Tabs>
    </div>
  );
}