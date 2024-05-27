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

  // Function to calculate savings based on retail price and our price
  const calculateSavings = (medication) => {
    const retailPrice = medication.Retail_Price;
    const ourCost = medication.ProRx;
    const savings = retailPrice - ourCost;
    return savings;
  };

  // Calculate total savings across all searches
  const totalSavings = searches.reduce((total, search) => {
    const savings = calculateSavings(search);
    return total + savings;
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
              const savings = calculateSavings(search);
              return (
                <li
                  key={index}
                  className="text-blue-500 underline cursor-pointer"
                  onClick={() => onSearch(search)}
                >
                  <Badge variant="outline" className="text-blue-500">
                    {search.Medication} - Savings: {formatter.format(savings)}
                  </Badge>
                </li>
              );
            })}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <span className="text-slate-800 font-medium">Total Possible Savings For All Searches:   </span>
        <span className="text-green-600 font-extrabold px-2">{formatter.format(totalSavings)}</span>
      </CardFooter>
    </Card>
  );
};

export default RecentSearches;
