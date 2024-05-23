//src\app\page.js
'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import SearchBar from '../components/SearchBar';
import PrescriptionCostComparison from '../components/PrescriptionCostComparison';
import RecentSearches from '../components/RecentSearches';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

// src\app\page.js
const handleSearch = (selectedMedication) => {
  setSearchQuery(selectedMedication.Medication);
  setSelectedMedication(selectedMedication);
  setRecentSearches((prevSearches) => [
    selectedMedication,
    ...prevSearches.filter((search) => search.Medication !== selectedMedication.Medication),
  ]);
};

  return (
    <div className="min-h-screen bg-gray-000">
      <Head>
        <title>Prescription Cost Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Prescription Cost Calculator</h1>
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {selectedMedication && (
              <PrescriptionCostComparison medication={selectedMedication} />
            )}
          </div>
          <div>
            <RecentSearches searches={recentSearches} onSearch={handleSearch} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;