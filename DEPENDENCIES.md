# Required Dependencies

## Install Additional Dependencies

To fully implement the Audiophile e-commerce site, you'll need to install these additional dependencies:

### Backend
```bash
npm install convex resend
```

### State Management (Optional)
```bash
npm install zustand
# OR use React Context API (already implemented)
```

### Styling
```bash
npm install sass autoprefixer tailwindcss postcss
```

### Type Definitions
```bash
npm install --save-dev @types/node
```

### Development Tools
```bash
npm install --save-dev @types/convex
```

## Installation Commands

Run this single command to install all dependencies at once:

```bash
npm install convex resend zustand sass autoprefixer tailwindcss postcss && npm install --save-dev @types/convex
```

## After Installation

1. **Convex Setup**:
   - Sign up at https://convex.dev
   - Run `npx convex dev` to initialize Convex
   - Update `NEXT_PUBLIC_CONVEX_URL` in `.env.local`

2. **Resend Setup**:
   - Sign up at https://resend.com
   - Get your API key
   - Update `RESEND_API_KEY` in `.env.local`

3. **Tailwind Setup**:
   - Run `npx tailwindcss init` if not already configured
   - The configuration is already in `tailwind.config.ts`

## Current Package.json

After adding dependencies, your `package.json` should look similar to this:

```json
{
  "dependencies": {
    "convex": "^1.x.x",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "next": "16.0.1",
    "resend": "^3.x.x",
    "zustand": "^4.x.x",
    "sass": "^1.x.x",
    "autoprefixer": "^10.x.x",
    "tailwindcss": "^3.x.x",
    "postcss": "^8.x.x"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/convex": "^1.x.x",
    "eslint": "^9",
    "eslint-config-next": "16.0.1"
  }
}
```

