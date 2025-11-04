# Audiophile E-commerce - Project Structure

Complete folder structure overview:

```
audiophile-ecommerce/
│
├── public/
│   ├── images/
│   │   ├── home/              # Home page images
│   │   ├── headphones/        # Headphones product images
│   │   ├── speakers/          # Speakers product images
│   │   ├── earphones/         # Earphones product images
│   │   └── shared/            # Shared/common images
│   └── logo.svg               # Company logo
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (header, footer, metadata)
│   │   ├── page.tsx                # Home page
│   │   ├── globals.css             # Existing global styles
│   │   ├── globals.scss            # SCSS global styles (NEW)
│   │   │
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Dynamic category pages
│   │   │
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Dynamic product detail pages
│   │   │
│   │   ├── cart/
│   │   │   └── page.tsx            # Cart page
│   │   │
│   │   ├── checkout/
│   │   │   └── page.tsx            # Checkout form page
│   │   │
│   │   └── confirmation/
│   │       └── page.tsx            # Order confirmation page
│   │
│   ├── components/
│   │   ├── ui/                     # Reusable UI components (Button, Input, etc.)
│   │   ├── layout/                 # Layout components (Navbar, Footer)
│   │   ├── home/                   # Home page sections (Hero, Featured, Categories)
│   │   ├── category/               # Category card & layout components
│   │   ├── product/                # Product detail components
│   │   ├── cart/                   # Cart modal/drawer components
│   │   └── checkout/               # Checkout form components
│   │
│   ├── lib/
│   │   ├── convex.ts               # Convex client configuration
│   │   ├── resend.ts               # Resend email setup
│   │   ├── utils.ts                # Helper functions
│   │   └── constants.ts            # Static constants (routes, categories, etc.)
│   │
│   ├── hooks/
│   │   ├── useCart.ts              # Cart state management (Context)
│   │   ├── useMediaQuery.ts        # Responsiveness hooks
│   │   └── useFormValidation.ts    # Form validation hooks
│   │
│   ├── types/
│   │   └── index.d.ts              # TypeScript type definitions
│   │
│   └── styles/
│       ├── _variables.scss         # SCSS variables (colors, typography, spacing)
│       ├── _mixins.scss            # SCSS mixins (responsive, buttons, etc.)
│       └── _breakpoints.scss       # Responsive breakpoints
│
├── convex/
│   ├── schema.ts                   # Convex database schema
│   └── functions/
│       ├── orders.ts               # Order management functions
│       └── products.ts             # Product query functions
│
├── .env.local                      # Environment variables (git-ignored)
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── next.config.ts                  # Next.js configuration
├── postcss.config.mjs              # PostCSS configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── eslint.config.mjs               # ESLint configuration
├── README.md                       # Project documentation
├── DEPENDENCIES.md                 # Additional dependencies needed
└── STRUCTURE.md                    # This file
```

## File Descriptions

### Pages (`src/app/`)
- **layout.tsx**: Root layout wrapping all pages with header/footer
- **page.tsx**: Home page with hero, featured products, and categories
- **category/[slug]/page.tsx**: Dynamic route for product categories
- **product/[slug]/page.tsx**: Dynamic route for individual products
- **cart/page.tsx**: Shopping cart page
- **checkout/page.tsx**: Checkout form with validation
- **confirmation/page.tsx**: Order confirmation screen

### Components (`src/components/`)
Organized by feature area with `.gitkeep` files marking directories ready for components.

### Libraries (`src/lib/`)
- **convex.ts**: Convex client setup for backend
- **resend.ts**: Email service integration
- **utils.ts**: Helper functions (formatPrice, validations, etc.)
- **constants.ts**: Static data (routes, categories, constants)

### Hooks (`src/hooks/`)
- **useCart.ts**: React Context for cart state management
- **useMediaQuery.ts**: Responsive design hooks
- **useFormValidation.ts**: Form validation utilities

### Styles (`src/styles/`)
- **globals.scss**: Main global styles importing all partials
- **variables.scss**: Design tokens
- **mixins.scss**: Reusable SCSS mixins
- **breakpoints.scss**: Responsive breakpoints

### Backend (`convex/`)
- **schema.ts**: Database schema definitions
- **functions/**: Convex mutation and query functions

### Configuration
- **next.config.ts**: Next.js config with image domains
- **tailwind.config.ts**: Tailwind customization
- **postcss.config.mjs**: PostCSS config
- **tsconfig.json**: TypeScript settings with path aliases (@/*)
- **package.json**: Dependencies and scripts

## Next Steps

1. **Install Dependencies**: See `DEPENDENCIES.md`
2. **Set up Convex**: Run `npx convex dev`
3. **Configure Environment**: Add API keys to `.env.local`
4. **Add Product Images**: Place images in respective folders
5. **Build Components**: Start with layout components (Navbar, Footer)
6. **Implement Features**: Begin with home page, then product pages

## Notes

- All TypeScript files are properly typed
- SCSS files use design tokens from `_variables.scss`
- Convex functions are set up for orders and products
- Form validation is ready with custom hooks
- Responsive breakpoints and mixins are configured
- Empty component directories marked with `.gitkeep`

