'use client';

export default function InvoicesPage({ params }: { params: { companyId: string } }) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Facturas</h1>
            {/* Aquí irá la lista de facturas */}
            <p className="text-muted-foreground">Lista de facturas en desarrollo...</p>
        </div>
    );
}