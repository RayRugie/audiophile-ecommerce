// Category slugs
export const CATEGORIES = {
  HEADPHONES: 'headphones',
  SPEAKERS: 'speakers',
  EARPHONES: 'earphones',
} as const;

// Navigation routes
export const ROUTES = {
  HOME: '/',
  HEADPHONES: '/category/headphones',
  SPEAKERS: '/category/speakers',
  EARPHONES: '/category/earphones',
  CART: '/cart',
  CHECKOUT: '/checkout',
  CONFIRMATION: '/confirmation',
} as const;

// Product types
export type CategoryType = typeof CATEGORIES[keyof typeof CATEGORIES];

// Footer links
export interface FooterLink {
  title: string;
  href: string;
}

export const FOOTER_LINKS: FooterLink[] = [
  { title: 'Home', href: ROUTES.HOME },
  { title: 'Headphones', href: ROUTES.HEADPHONES },
  { title: 'Speakers', href: ROUTES.SPEAKERS },
  { title: 'Earphones', href: ROUTES.EARPHONES },
];

// Social links
export interface SocialLink {
  name: string;
  icon: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Facebook', icon: 'facebook', href: 'https://facebook.com' },
  { name: 'Twitter', icon: 'twitter', href: 'https://twitter.com' },
  { name: 'Instagram', icon: 'instagram', href: 'https://instagram.com' },
];

// Shipping information
export const SHIPPING_INFO = {
  FREE_THRESHOLD: 50,
  STANDARD_COST: 5,
  EXPRESS_COST: 15,
};

// VAT rate (e.g., 20% in UK)
export const VAT_RATE = 0.2;

