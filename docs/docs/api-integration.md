---
sidebar_position: 2
---

# API Integration

This page explains how the Cosmic Crypto Tracker integrates with cryptocurrency APIs to fetch and display real-time data.

## API Provider

The application uses the [CoinGecko API](https://www.coingecko.com/en/api) to fetch cryptocurrency data. CoinGecko provides a free tier that allows for basic usage without requiring an API key, making it ideal for this project.

## Data Fetching Implementation

### API Client

We've created a dedicated API client in `lib/api.ts` that handles all interactions with the CoinGecko API:

```typescript
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
```

### Data Validation with Zod

We use [Zod](https://github.com/colinhacks/zod) for runtime type validation of the API responses. This ensures that:

1. The data structure matches our expectations
2. We catch any API changes or inconsistencies early
3. We have proper TypeScript types derived from our schemas

### Endpoints Used

The application primarily uses the following CoinGecko endpoint:

- `/coins/markets` - Returns a list of coins with market data

## Data Refresh Strategy

The application implements two strategies for data refreshing:

1. **Initial Load**: Data is fetched when the component mounts
2. **Manual Refresh**: Users can click the "Refresh" button to fetch the latest data

This approach balances having up-to-date information while respecting API rate limits.

## Error Handling

The API integration includes comprehensive error handling:

1. Network errors are caught and displayed to the user
2. Invalid data structures are caught by Zod validation
3. User-friendly error messages are shown via toast notifications
4. The UI gracefully degrades when data is unavailable

## Rate Limiting Considerations

CoinGecko's free API has rate limits (typically around 10-50 requests per minute). The application is designed to be mindful of these limits by:

1. Limiting automatic refreshes
2. Implementing manual refresh controls
3. Caching data where appropriate
4. Providing clear feedback when rate limits are hit

## Future Improvements

Potential improvements to the API integration include:

1. Implementing a more sophisticated caching strategy
2. Adding support for WebSockets for real-time updates
3. Expanding to additional endpoints for more detailed information
4. Adding support for multiple API providers for redundancy