import { CryptoList } from '@/components/crypto-list';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-950/30 to-black">
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8 max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              Crypto Price Tracker
            </h1>
            <p className="text-lg text-purple-600/30 max-w-2xl mx-auto">
              Track real-time prices of top cryptocurrencies with our sleek, cosmic-themed tracker.
            </p>
          </div>
          
          <CryptoList />
          
          <footer className="pt-12 text-center text-sm text-purple-300/60">
            <p>Data provided by CoinGecko API • Refreshed in real-time</p>
          </footer>
        </div>
      </div>
    </main>
  );
}