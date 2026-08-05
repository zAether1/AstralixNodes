'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'EUR' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (eurPrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Conversion rate approximation (you could fetch this, but hardcoding works for static hosting).
const EUR_TO_USD_RATE = 1.08;

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('astralix_currency') as Currency;
    if (saved && (saved === 'EUR' || saved === 'USD')) {
      setCurrency(saved);
    }
  }, []);

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    localStorage.setItem('astralix_currency', newCurrency);
  };

  const formatPrice = (eurPrice: number) => {
    if (!mounted) return `€${eurPrice.toFixed(2)}`; // default SSR
    
    if (currency === 'EUR') {
      return `€${eurPrice.toFixed(2)}`;
    } else {
      return `$${(eurPrice * EUR_TO_USD_RATE).toFixed(2)}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
