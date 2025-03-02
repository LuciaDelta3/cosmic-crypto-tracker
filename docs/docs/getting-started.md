---
sidebar_position: 1
---

# Getting Started

Welcome to the Cosmic Crypto Tracker documentation! This guide will help you set up and run the project locally.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js (v16.8 or later)
- npm or yarn

## Project Structure

The project is organized into two main directories:

```
/
├── web-app/       # Next.js application (Crypto Tracker)
└── docs/          # Docusaurus documentation
```

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/cosmic-crypto-tracker.git
cd cosmic-crypto-tracker
```

### Install Dependencies

```bash
# Install web app dependencies
npm install

# Install documentation dependencies
cd docs
npm install
cd ..
```

## Running the Web App

To start the Next.js development server:

```bash
npm run dev
```

This will start the development server at [http://localhost:3000](http://localhost:3000).

## Running the Documentation

To start the Docusaurus documentation site:

```bash
npm run docs:dev
```

This will start the documentation server at [http://localhost:3000](http://localhost:3000).

## Building for Production

### Web App

To build the web app for production:

```bash
npm run build
```

The output will be in the `out` directory.

### Documentation

To build the documentation for production:

```bash
npm run docs:build
```

The output will be in the `docs/build` directory.

## Deployment

The project is configured for deployment on Netlify. You can deploy both the web app and documentation by connecting your GitHub repository to Netlify.