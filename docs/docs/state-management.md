---
sidebar_position: 3
---

# State Management

This page explains the state management approach used in the Cosmic Crypto Tracker application.

## State Management Approach

The application uses React's built-in hooks for state management, specifically:

- `useState` for component-level state
- `useEffect` for side effects like data fetching
- Custom hooks to encapsulate related state and logic

This approach was chosen for its simplicity, maintainability, and appropriateness for the application's needs.

## Custom Hook: `useCrypto`

The core of our state management is the `useCrypto` custom hook located in `hooks/use-crypto.ts`:

```typescript
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
```

## Why We Chose This Approach

### Advantages of Using React Hooks

1. **Simplicity**: React's built-in hooks provide a straightforward way to manage state without additional dependencies.

2. **Encapsulation**: Custom hooks allow us to encapsulate related state and logic, making components cleaner and more focused.

3. **Reusability**: The `useCrypto` hook can be used across multiple components if needed.

4. **Maintainability**: The codebase remains simple and easy to understand, with clear separation of concerns.

5. **Bundle Size**: No additional state management libraries means a smaller bundle size.

### Comparison with Other State Management Solutions

While there are many state management libraries available (Redux, Zustand, Jotai, etc.), we chose React's built-in hooks because:

1. **Appropriate Complexity**: The application's state requirements are relatively simple and don't warrant a more complex solution.

2. **Learning Curve**: Using built-in hooks means developers don't need to learn additional libraries.

3. **Future-Proof**: React hooks are a core part of React and will be supported for the foreseeable future.

## State Structure

The application's state is organized as follows:

1. **Raw Data**: The complete list of cryptocurrencies fetched from the API.
2. **Filtered Data**: The subset of cryptocurrencies displayed to the user based on search criteria.
3. **UI State**: Loading states, error messages, and search terms.

## Data Flow

The data flow in the application follows these steps:

1. The `useCrypto` hook fetches data from the CoinGecko API on component mount.
2. The data is stored in the `cryptos` state variable.
3. A filtered subset (top 5 by default) is stored in `filteredCryptos`.
4. When a user searches, the `handleSearch` function filters the data and updates `filteredCryptos`.
5. When a user clicks refresh, the `refreshData` function fetches fresh data from the API.
6. Components consume the state and functions returned by the `useCrypto` hook.

## Error Handling

Error handling is integrated into the state management:

1. API errors are caught and stored in the `error` state variable.
2. Loading states are tracked with the `isLoading` state variable.
3. Toast notifications provide user feedback for successful and failed operations.

## Future Considerations

As the application grows, we might consider:

1. **Context API**: If state needs to be shared across many components, we could move the state to a React Context.
2. **Server State Management**: For more complex data fetching, caching, and synchronization, we might adopt a library like React Query or SWR.
3. **Global State Management**: If the application grows significantly in complexity, we might adopt a more robust state management solution like Zustand or Redux.