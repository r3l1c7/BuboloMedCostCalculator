// src\components\PrescriptionCostComparison.js
import React from 'react';
import { badgeVariants } from "@/components/ui/badge"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"


const PrescriptionCostComparison = ({ medication }) => {
  const pharmacies = [
    { name: 'Walgreens', price: medication.Walgreens, img: 'http://localhost:3000/walgreens.webp' },
    { name: 'CVS', price: medication.CVS, img: 'http://localhost:3000/cvs.webp' },
    { name: 'Walmart', price: medication.Walmart, img: 'http://localhost:3000/walmart.webp' },
    {
      name: 'GoodRx Average',
      price: (medication.GoodRXMin + medication.GoodRxMax) / 2, img: 'http://localhost:3000/goodRx.jpg'
    },
    // Add more pharmacies and their prices
  ];
  let avgSaving =0;
  const ourCost = medication.ProRx;
  console.log('min'+ medication.GoodRXMin);
  console.log('max'+medication.GoodRxMax);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  console.log('-----{medication.Proven_RX_Cost_per_Rx-----');
  pharmacies.forEach(element => {
    avgSaving = avgSaving + element.price - ourCost;
  });
  avgSaving = avgSaving/4;
  console.log(avgSaving);
  console.log('----------');
 /* let avgSaving = (
    (medication.GoodRXMin + medication.GoodRxMax) / 2, 
    pharmacies.Walmart - medication.Proven_RX_Cost_per_Rx, 
    pharmacies.Walgreens - medication.Proven_RX_Cost_per_Rx, 
    pharmacies.CVS - medication.Proven_RX_Cost_per_Rx) /4;
*/
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Our Price - {formatter.format(ourCost)}</CardTitle>
          <CardDescription><Badge variant="outline" className="text-green-900 bg-slate-000">{medication.Medication}</Badge></CardDescription>
        </CardHeader>
        <CardContent>
          {pharmacies.map((pharmacy, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <Avatar className="text-xl font-medium float-left my-1">
                  <AvatarImage src={pharmacy.img} />
                  <AvatarFallback>{pharmacy.name}</AvatarFallback>
                </Avatar>
                <p className="text-xl font-medium float-left align-middle my-2 px-4"> {pharmacy.name}</p>
                <p className="text-gray-1000 align-middle my-2 mx-10 px-4"><strong>{formatter.format(pharmacy.price)}</strong> </p>
              </div>

              <div className="text-slate-900">
                <Badge className="text-green-700 bg-slate-200">We Save You {formatter.format(pharmacy.price - ourCost)}</Badge>
              </div>
              

            </div>
            
          ))}
        </CardContent>
        <CardFooter>
          <p></p>
          <Badge variant="outline" className="text-green-900 bg-slate-000">Dosage: {medication.OurDose}</Badge>
          <Badge variant="outline" className="text-green-900 bg-slate-000 float-right">Average Saving: {formatter.format(avgSaving)}</Badge>
        </CardFooter>
      </Card>


    </div>
  );
};

export default PrescriptionCostComparison;