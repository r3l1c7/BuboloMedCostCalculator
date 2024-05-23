// pages/api/medications.js
/*import sql from 'mssql';
import { EventEmitter } from 'events';
import dotenv from 'dotenv';

dotenv.config();
EventEmitter.defaultMaxListeners = 15; // Increase the limit as needed
console.log("Database Configuration:", {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  server: process.env.DB_SERVER,
  port: process.env.DB_PORT
});
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  server: process.env.DB_SERVER,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: true,
      trustServerCertificate: false,
    },
    port: 1433,
    connectionTimeout: 30000,
  
};

export default async function handler(req, res) {
  try {
    const pool = await sql.connect(config);
    const { searchQuery } = req.query;

    const result = await pool.request()
      .input('searchQuery', sql.NVarChar, `${searchQuery}%`)
      .query(`SELECT TOP (7) [Medication]
      ,[Retail_Price]
      ,[Cost_Plus_Price]
      ,[Retail_Good_RXMin]
      ,[Retail_Good_RXMax]
      ,[GoodRXMin]
      ,[GoodRxMax]
      ,[PDRX_Cost]
      ,[Proven_RX_Cost]
      ,[Dosage]
      ,[PDRX_Cost_per_Rx]
      ,[Proven_RX_Cost_per_Rx]
      ,[OurDose]
      ,[Walmart]
      ,[CVS]
      ,[Walgreens]
        FROM [dbo].[Medication] WHERE Medication LIKE @searchQuery`);
 
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medications', error });
  } finally {
    await sql.close();
  }
}*/
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'medications.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const medications = JSON.parse(jsonData);
    console.log(medications);
    const { searchQuery } = req.query;

    // Filter the medications based on the search query
    const filteredMedications = medications.filter(medication =>
      medication.Medication.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 7);

    res.status(200).json(filteredMedications);
  } catch (error) {
    console.error('Error fetching medications', error);
    res.status(500).json({ message: 'Error fetching medications', error });
  }
}
