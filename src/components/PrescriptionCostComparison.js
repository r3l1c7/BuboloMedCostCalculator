// src\components\PrescriptionCostComparison.js
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
          <CardDescription><Badge variant="outline" className="text-green-900 bg-slate-100">{medication.Medication}</Badge></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <p className="text-xl font-medium my-2">Retail Price: <strong>{formatter.format(retailPrice)}</strong></p>
            <p className="text-xl font-medium my-2">
              Our Price: 
              <strong>
                <div className="inline-block text-white px-4 py-2 rounded cursor-not-allowed" style={{ backgroundColor: '#cd5928' }}>
                  {formatter.format(ourPrice)}
                </div>
              </strong>
            </p>
          </div>
          <div className="text-slate-900">
            <Badge className="text-green-700 bg-slate-200">You Save: {formatter.format(savings)}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescriptionCostComparison;
