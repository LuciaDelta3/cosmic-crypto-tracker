"use client";

import { Crypto } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import Image from 'next/image';

interface CryptoCardProps {
  crypto: Crypto;
}

export function CryptoCard({ crypto }: CryptoCardProps) {
  const priceChangeIsPositive = crypto.price_change_percentage_24h && crypto.price_change_percentage_24h > 0;
  
  return (
    <Card className="overflow-hidden border-none bg-black/60 backdrop-blur-md hover:bg-black/60 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <div className="relative h-8 w-8">
            <Image 
              src={crypto.image} 
              alt={crypto.name} 
              fill 
              className="rounded-full object-cover"
            />
          </div>
          <CardTitle className="text-lg font-bold">{crypto.name}</CardTitle>
          <Badge variant="outline" className="uppercase text-xs">
            {crypto.symbol}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          Rank #{crypto.market_cap_rank}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-1">
          <div className="text-2xl font-bold">${crypto.current_price.toLocaleString()}</div>
          <div className="flex items-center space-x-2">
            <div className={`flex items-center ${priceChangeIsPositive ? 'text-green-500' : 'text-red-500'}`}>
              {priceChangeIsPositive ? (
                <ArrowUpIcon className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 mr-1" />
              )}
              <span>
                {crypto.price_change_percentage_24h 
                  ? `${Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%` 
                  : '0.00%'}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              24h Volume: ${crypto.total_volume.toLocaleString()}
            </div>
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            Market Cap: ${crypto.market_cap.toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}