import { Invoice } from '@/types/invoice'

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceType: 'A',
    invoiceNumber: '0001-00000001',
    issueDate: '2025-09-01',
    dueDate: '2025-10-01',
    client: {
      cuit: '30-71234567-8',
      name: 'Empresa ABC S.A.'
    },
    provider: {
      cuit: '30-98765432-1',
      name: 'Mi Empresa'
    },
    items: [
      {
        code: 'PROD-001',
        description: 'Desarrollo de software',
        quantity: 1,
        unitPrice: 150000,
        netAmount: 150000
      }
    ],
    subtotal: 150000,
    iva: 31500,
    perceptions: [],
    total: 181500,
    status: 'pending_approval',
    pdfUrl: '/facturas/001.pdf'
  },
  {
    id: '2',
    invoiceType: 'B',
    invoiceNumber: '0001-00000002',
    issueDate: '2025-08-15',
    dueDate: '2025-09-15',
    client: {
      cuit: '30-45678901-2',
      name: 'Comercio XYZ'
    },
    provider: {
      cuit: '30-98765432-1',
      name: 'Mi Empresa'
    },
    items: [
      {
        code: 'SERV-001',
        description: 'Mantenimiento mensual',
        quantity: 1,
        unitPrice: 50000,
        netAmount: 50000
      },
      {
        code: 'SERV-002',
        description: 'Soporte técnico',
        quantity: 10,
        unitPrice: 2500,
        netAmount: 25000
      }
    ],
    subtotal: 75000,
    iva: 15750,
    perceptions: [
      {
        id: 'PERC-001',
        description: 'IIBB',
        amount: 2250
      }
    ],
    total: 93000,
    status: 'approved'
  },
  {
    id: '3',
    invoiceType: 'C',
    invoiceNumber: '0001-00000003',
    issueDate: '2025-07-01',
    dueDate: '2025-07-31',
    client: {
      cuit: '30-89012345-6',
      name: 'Distribuidora 123'
    },
    provider: {
      cuit: '30-98765432-1',
      name: 'Mi Empresa'
    },
    items: [
      {
        code: 'CONS-001',
        description: 'Consultoría estratégica',
        quantity: 1,
        unitPrice: 200000,
        netAmount: 200000
      }
    ],
    subtotal: 200000,
    iva: 0,
    perceptions: [],
    total: 200000,
    status: 'paid'
  },
  {
    id: '4',
    invoiceType: 'A',
    invoiceNumber: '0001-00000004',
    issueDate: '2025-06-15',
    dueDate: '2025-07-15',
    client: {
      cuit: '30-23456789-0',
      name: 'Industrias DEF'
    },
    provider: {
      cuit: '30-98765432-1',
      name: 'Mi Empresa'
    },
    items: [
      {
        code: 'PROD-002',
        description: 'Licencia anual',
        quantity: 1,
        unitPrice: 300000,
        netAmount: 300000
      }
    ],
    subtotal: 300000,
    iva: 63000,
    perceptions: [
      {
        id: 'PERC-002',
        description: 'IIBB',
        amount: 9000
      },
      {
        id: 'PERC-003',
        description: 'IVA',
        amount: 6000
      }
    ],
    total: 378000,
    status: 'overdue'
  },
  {
    id: '5',
    invoiceType: 'B',
    invoiceNumber: '0001-00000005',
    issueDate: '2025-09-25',
    dueDate: '2025-10-25',
    client: {
      cuit: '30-34567890-1',
      name: 'Servicios GHI'
    },
    provider: {
      cuit: '30-98765432-1',
      name: 'Mi Empresa'
    },
    items: [
      {
        code: 'SERV-003',
        description: 'Capacitación',
        quantity: 2,
        unitPrice: 45000,
        netAmount: 90000
      },
      {
        code: 'MAT-001',
        description: 'Material didáctico',
        quantity: 10,
        unitPrice: 1000,
        netAmount: 10000
      }
    ],
    subtotal: 100000,
    iva: 21000,
    perceptions: [],
    total: 121000,
    status: 'pending_approval'
  }
]