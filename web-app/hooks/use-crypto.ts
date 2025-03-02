"use client";

import { useState, useEffect } from 'react';
import { fetchCryptoData, Crypto } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

export function useCrypto() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<Crypto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchCryptoData();
      setCryptos(data);
      
      // Only show top 5 cryptocurrencies by default
      const top5 = data.slice(0, 5);
      setFilteredCryptos(top5);
    } catch (err) {
      setError('Failed to fetch cryptocurrency data. Please try again later.');
      toast({
        title: "Error",
        description: "Failed to fetch cryptocurrency data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    await fetchData();
    toast({
      title: "Data Refreshed",
      description: "Cryptocurrency data has been updated.",
    });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      // If search is empty, show top 5
      setFilteredCryptos(cryptos.slice(0, 5));
      return;
    }
    
    const filtered = cryptos.filter(
      (crypto) => 
        crypto.name.toLowerCase().includes(term.toLowerCase()) || 
        crypto.symbol.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredCryptos(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    cryptos: filteredCryptos,
    isLoading,
    error,
    searchTerm,
    handleSearch,
    refreshData,
  };
}