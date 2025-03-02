# Cosmic Crypto Tracker

A sleek, cosmic-themed cryptocurrency price tracker built with Next.js and Tailwind CSS.

## Features

- Real-time tracking of cryptocurrency prices
- Search functionality to filter cryptocurrencies
- Manual refresh button to fetch the latest data
- Responsive design for both desktop and mobile
- Beautiful cosmic-themed UI with black and purple gradients

## Project Structure

The project is organized into two main directories:

- `/web-app` - The Next.js application for the crypto tracker
- `/docs` - Docusaurus documentation (coming soon)

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Integration

This project uses the CoinGecko API to fetch cryptocurrency data. The API is free to use and does not require an API key for basic usage.

## State Management

The application uses React's built-in hooks (useState, useEffect) for state management. This approach was chosen for its simplicity and effectiveness for this particular use case.

## Deployment

The web app is configured for deployment on Netlify.

## License

MIT