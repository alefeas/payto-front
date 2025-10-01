import { BusinessNetworkCompany } from '@/types/business-network'

export const mockBusinessNetwork: BusinessNetworkCompany[] = [
  {
    id: '1',
    name: 'TechSolutions SA',
    cuit: '30-71234567-8',
    status: 'connected',
    connectionDate: '2025-01-15',
    transactionsCount: 45,
    lastTransaction: '2025-09-25'
  },
  {
    id: '2',
    name: 'Distribuidora del Sur',
    cuit: '30-89012345-6',
    status: 'connected',
    connectionDate: '2025-03-20',
    transactionsCount: 28,
    lastTransaction: '2025-09-28'
  },
  {
    id: '3',
    name: 'Industrias Metalúrgicas ABC',
    cuit: '30-45678901-2',
    status: 'pending',
    connectionDate: '2025-09-29',
    transactionsCount: 0,
    lastTransaction: null
  },
  {
    id: '4',
    name: 'Servicios Profesionales XYZ',
    cuit: '30-23456789-0',
    status: 'connected',
    connectionDate: '2025-02-10',
    transactionsCount: 15,
    lastTransaction: '2025-09-15'
  },
  {
    id: '5',
    name: 'Constructora del Norte',
    cuit: '30-34567890-1',
    status: 'pending',
    connectionDate: '2025-09-30',
    transactionsCount: 0,
    lastTransaction: null
  },
  {
    id: '6',
    name: 'Logística Rápida SA',
    cuit: '30-56789012-3',
    status: 'connected',
    connectionDate: '2025-04-05',
    transactionsCount: 32,
    lastTransaction: '2025-09-27'
  },
  {
    id: '7',
    name: 'Supermercados Unidos',
    cuit: '30-67890123-4',
    status: 'connected',
    connectionDate: '2025-05-12',
    transactionsCount: 52,
    lastTransaction: '2025-09-29'
  },
  {
    id: '8',
    name: 'Farmacia Central SA',
    cuit: '30-78901234-5',
    status: 'pending',
    connectionDate: '2025-09-28',
    transactionsCount: 0,
    lastTransaction: null
  },
  {
    id: '9',
    name: 'Autopartes del Este',
    cuit: '30-89012345-6',
    status: 'connected',
    connectionDate: '2025-06-18',
    transactionsCount: 23,
    lastTransaction: '2025-09-26'
  },
  {
    id: '10',
    name: 'Consultores Asociados',
    cuit: '30-90123456-7',
    status: 'connected',
    connectionDate: '2025-07-22',
    transactionsCount: 18,
    lastTransaction: '2025-09-24'
  }
]