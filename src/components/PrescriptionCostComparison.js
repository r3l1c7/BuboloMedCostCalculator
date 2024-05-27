// src\components\PrescriptionCostComparison.js
import React from 'react';
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const PrescriptionCostComparison = ({ medication }) => {
  const retailPrice = medication.Retail_Price; // Assuming Retail_Price is the correct property
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Retail Price - {formatter.format(retailPrice)}</CardTitle>
          <CardDescription><Badge variant="outline" className="text-green-900 bg-slate-000">{medication.Medication}</Badge></CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium my-2">The retail price of {medication.Medication} is <strong>{formatter.format(retailPrice)}</strong>.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescriptionCostComparison;
