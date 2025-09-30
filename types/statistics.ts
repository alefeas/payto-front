export interface CompanyStats {
    // Resumen General
    totalExpenses: number;
    pendingPayments: number;
    paidAmount: number;
    averagePaymentTime: number;

    // Métricas por Período
    monthlyExpenses: {
        month: string;
        amount: number;
        invoiceCount: number;
    }[];
    
    // Análisis de Proveedores
    topProviders: {
        name: string;
        totalAmount: number;
        invoiceCount: number;
        averagePaymentTime: number;
    }[];

    // Flujo de Caja
    cashFlow: {
        month: string;
        inflow: number;
        outflow: number;
        balance: number;
    }[];

    // Métricas de Facturas
    invoiceStats: {
        total: number;
        pending: number;
        paid: number;
        overdue: number;
        averageAmount: number;
    };

    // Tendencias de Gastos
    expensesByCategory: {
        category: string;
        amount: number;
        percentage: number;
    }[];

    // Comparativa Interanual
    yearlyComparison: {
        year: number;
        totalExpenses: number;
        invoiceCount: number;
        averageExpense: number;
    }[];
}