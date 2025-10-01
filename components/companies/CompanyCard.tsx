import { BusinessNetworkCompany } from "@/types/business-network"
import { BusinessRelation, BusinessRelationType } from "@/types/company"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users } from "lucide-react"

interface CompanyCardProps {
  company: BusinessNetworkCompany
  relation: BusinessRelation
  relationTypes: Array<{
    value: BusinessRelationType
    label: string
    description: string
  }>
  isPending?: boolean
}

export function CompanyCard({ 
  company, 
  relation, 
  relationTypes,
  isPending = false 
}: CompanyCardProps) {
  return (
    <Card key={relation.id} className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{company.name}</h3>
          <p className="text-sm text-muted-foreground">CUIT: {company.cuit}</p>
          <p className="text-sm text-muted-foreground">
            {company.transactionsCount} transacciones
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Users className="h-4 w-4" />
            <span className="text-sm">
              {relationTypes.find(t => t.value === relation.type)?.label}
            </span>
          </div>
        </div>
        {isPending ? (
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Rechazar</Button>
            <Button size="sm">Aceptar</Button>
          </div>
        ) : (
          relation.status && <Badge variant={
            relation.status === 'active' ? "secondary" :
            relation.status === 'pending' ? "outline" :
            "destructive"
          }>
            {relation.status === 'active' ? "Activa" :
             relation.status === 'pending' ? "Pendiente" :
             "Rechazada"}
          </Badge>
        )}
      </div>
    </Card>
  )
}