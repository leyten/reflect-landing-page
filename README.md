# Reflect

![Reflect Logo](/public/reflected-logo.png)

## Reflect is an AI-powered trading co-pilot for emotional traders.

Built for the fast, high-pressure world of Solana, Reflect helps you trade smarter by understanding not just the market, but you.

Once you connect your wallet, Reflect analyzes your on-chain activity and builds a behavioral profile: how often you trade, how you handle risk, and how your emotions show up in your decisions. It categorizes your trading style, whether you're impulsive, overconfident, hesitant, or stuck in a losing cycle and gives you tailored, psychologically-aware feedback.

As a browser extension, Reflect works live, right alongside your trading activity. When you're about to overtrade, revenge trade, or make an emotionally driven move, Reflect quietly steps in with real-time pop-ups, intelligent nudges to help break the pattern before it costs you.

## Getting Started

Reflect integrates seamlessly with your existing Solana wallets. Simply connect your wallet, set your preferences, and let Reflect's AI begin analyzing your trading patterns and the broader market to provide personalized insights.

## Installation

### Required Dependencies

\`\`\`bash
npm install @privy-io/react-auth @privy-io/react-auth/solana @solana/web3.js @solana/spl-token
\`\`\`

### Optional: TradingView Lightweight Charts (Recommended)

For enhanced chart functionality, install TradingView's Lightweight Charts:

\`\`\`bash
npm install lightweight-charts
\`\`\`

If you prefer to use the built-in Recharts implementation, the dashboard will work without this dependency.

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`env
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
PRIVY_APP_SECRET=your_privy_app_secret
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
MORALIS_API_KEY=your_moralis_api_key
\`\`\`

## Privacy & Security

Your financial data never leaves your device. Reflect's AI runs locally when possible and all communications are end-to-end encrypted. We never store your private keys and you remain in complete control of your assets at all times.

## Join the Community

Connect with other traders using Reflect:

- [X](https://x.com/Use_Reflect)
