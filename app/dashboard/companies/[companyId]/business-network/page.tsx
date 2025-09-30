'use client';

import { BusinessNetwork } from "@/components/companies/BusinessNetwork";

export default function BusinessNetworkPage({ params }: { params: { companyId: string } }) {
  return (
    <div className="container mx-auto py-8">
      <BusinessNetwork />
    </div>
  );
}