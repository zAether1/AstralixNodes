'use client';
import React from 'react';
import { useCurrency } from '../contexts/CurrencyContext';

export default function Price({ eur }: { eur: number }) {
  const { formatPrice } = useCurrency();
  return <>{formatPrice(eur)}</>;
}
