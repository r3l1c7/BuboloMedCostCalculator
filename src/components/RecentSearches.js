// src\components\RecentSearches.js
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RecentSearches = ({ searches, onSearch }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const calculateAverageSavings = (medication) => {
    const pharmacies = [
      { name: 'Walgreens', price: medication.Walgreens },
      { name: 'CVS', price: medication.CVS },
      { name: 'Walmart', price: medication.Walmart },
      { name: 'GoodRx Average', price: (medication.GoodRXMin + medication.GoodRxMax) / 2 },
    ];
    const ourCost = medication.ProRx;
    let avgSaving = 0;

    pharmacies.forEach(element => {
      avgSaving = avgSaving + element.price - ourCost;
    });
    avgSaving = avgSaving / 4;

    return avgSaving;
  };

  const totalSavings = searches.reduce((total, search) => {
    const avgSaving = calculateAverageSavings(search);
    return total + avgSaving;
  }, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Searches</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-white text-blue-500 rounded-lg p-6">
          <ul className="space-y-2">
            {searches.map((search, index) => {
              const avgSaving = calculateAverageSavings(search);
              return (
                <li
                  key={index}
                  className="text-blue-500 underline cursor-pointer"
                  onClick={() => onSearch(search)}
                >
                  <Badge variant="outline" className="text-blue-500">
                    {search.Medication} - Average Saving: {formatter.format(avgSaving)}
                  </Badge>
                </li>
              );
            })}
          </ul>
        </div>
      </CardContent>
      <CardFooter><span className="text-slate-800 font-medium">Total Possible Savings For All Searches:   </span> <span className="text-green-600 font-extrabold px-2"> {formatter.format(totalSavings)}</span></CardFooter>
    </Card>
  );
};

export default RecentSearches;