// src\components\PrescriptionCostComparison.js
import React from 'react';
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const PrescriptionCostComparison = ({ medication }) => {
  const retailPrice = medication.Retail_Price; // The retail price of the medication
  const ourPrice = medication.ProRx; // Your offering price

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const savings = retailPrice - ourPrice; // Calculate savings

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Price Comparison</CardTitle>
          <CardDescription><Badge variant="outline" className="text-green-900 bg-slate-000">{medication.Medication}</Badge></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <p className="text-xl font-medium my-2">Retail Price: <strong>{formatter.format(retailPrice)}</strong></p>
            <p className="text-xl font-medium my-2">Our Price: <strong>{formatter.format(ourPrice)}</strong></p>
          </div>
          <p className="text-xl font-medium my-2">You Save: <strong>{formatter.format(savings)}</strong></p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescriptionCostComparison;
