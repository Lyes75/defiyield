import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Layout/Navbar';
import { HomePage } from './pages/HomePage';
import { TransactionsPage } from './pages/TransactionsPage';
import { useArbitrageData } from './hooks/useArbitrageData';

export default function App() {
  const { isLoading, lastUpdate } = useArbitrageData();

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="relative">
        <Navbar
          isLoading={isLoading}
          lastUpdate={lastUpdate}
        />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Routes>
      </div>
      
      <Toaster position="top-right" />
    </div>
  );
}