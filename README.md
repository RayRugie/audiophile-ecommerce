# Audiophile E-commerce

A modern, responsive e-commerce platform for premium audio equipment built with Next.js, React, and Convex.

## Features

- 🎧 **Product Categories**: Headphones, Speakers, and Earphones
- 🛒 **Shopping Cart**: Add, update, and remove items
- 💳 **Checkout**: Secure checkout with form validation
- 📧 **Email Confirmations**: Order confirmations via Resend
- 📱 **Responsive Design**: Mobile-first design approach
- ⚡ **Fast Performance**: Optimized with Next.js App Router

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS with Tailwind CSS
- **Backend**: Convex
- **Email**: Resend
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd audiophile-ecommerce
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Fill in your environment variables in \`.env.local\`:
- \`NEXT_PUBLIC_CONVEX_URL\`: Your Convex deployment URL
- \`RESEND_API_KEY\`: Your Resend API key

4. Start the development server:
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
audiophile-ecommerce/
├── public/              # Static assets
│   └── images/          # Product images
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and configurations
│   ├── styles/          # SCSS variables, mixins, etc.
│   └── types/           # TypeScript type definitions
├── convex/              # Convex backend functions
└── ...config files
\`\`\`

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint

## Development

### Adding New Products

1. Add product data to \`convex/schema.ts\`
2. Implement product functions in \`convex/functions/products.ts\`
3. Create product pages in \`src/app/product/[slug]/page.tsx\`

### Styling

- Global styles: \`src/app/globals.scss\`
- Variables: \`src/styles/_variables.scss\`
- Mixins: \`src/styles/_mixins.scss\`
- Breakpoints: \`src/styles/_breakpoints.scss\`

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy!

## License

MIT

## Acknowledgments

- Design inspired by Frontend Mentor challenges
- Built with modern web technologies
