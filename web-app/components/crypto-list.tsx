"use client";

import { useCrypto } from '@/hooks/use-crypto';
import { CryptoCard } from '@/components/crypto-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RefreshCwIcon, SearchIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function CryptoList() {
  const { cryptos, isLoading, error, searchTerm, handleSearch, refreshData } = useCrypto();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 bg-black/40 border-purple-500/30 focus-visible:ring-purple-500"
          />
        </div>
        <Button 
          onClick={refreshData} 
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 text-white border-none"
        >
          <RefreshCwIcon className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-destructive/20 text-destructive rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(5).fill(0).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-[200px] w-full rounded-lg" />
            </div>
          ))
        ) : cryptos.length > 0 ? (
          cryptos.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            No cryptocurrencies found. Try a different search term.
          </div>
        )}
      </div>
    </div>
  );
}