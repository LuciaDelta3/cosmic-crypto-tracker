import { z } from 'zod';

// Define the schema for cryptocurrency data
export const CryptoSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  image: z.string(),
  current_price: z.number(),
  market_cap: z.number(),
  market_cap_rank: z.number(),
  price_change_percentage_24h: z.number().nullable(),
  price_change_24h: z.number().nullable(),
  total_volume: z.number(),
});

export type Crypto = z.infer<typeof CryptoSchema>;

// Define the schema for the API response
export const CryptoResponseSchema = z.array(CryptoSchema);

// Function to fetch cryptocurrency data
export async function fetchCryptoData(search: string = ''): Promise<Crypto[]> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch cryptocurrency data');
    }
    
    const data = await response.json();
    const parsedData = CryptoResponseSchema.parse(data);
    
    // Filter by search term if provided
    if (search) {
      const searchLower = search.toLowerCase();
      return parsedData.filter(
        (crypto) => 
          crypto.name.toLowerCase().includes(searchLower) || 
          crypto.symbol.toLowerCase().includes(searchLower)
      );
    }
    
    return parsedData;
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    throw error;
  }
}