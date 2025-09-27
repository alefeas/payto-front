'use client';

export default function DocumentsPage({ params }: { params: { companyId: string } }) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Documentos TXT</h1>
            {/* Aquí irá la lista de documentos */}
            <p className="text-muted-foreground">Lista de documentos en desarrollo...</p>
        </div>
    );
}