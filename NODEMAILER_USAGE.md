# Nodemailer Setup & Usage Guide

## 1. Environment Variables Setup

Create a `.env.local` file in the root directory with your email credentials:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=Audiophile E-commerce <your-email@gmail.com>
```

### Gmail Setup:
1. Enable **2-Step Verification** in your Google Account
2. Go to **App Passwords** (https://myaccount.google.com/apppasswords)
3. Generate an App Password for "Mail"
4. Use this App Password (not your regular password) in `SMTP_PASSWORD`

### Other Email Providers:
- **Outlook/Hotmail**: `smtp-mail.outlook.com`, port `587`
- **Yahoo**: `smtp.mail.yahoo.com`, port `587`
- **Custom SMTP**: Use your provider's SMTP settings

## 2. Usage Examples

### Example 1: Send Email from API Route (Server-Side)

```typescript
// src/app/api/send-email/route.ts
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  const { to, subject, html } = await request.json();
  
  const result = await sendEmail({
    to,
    subject,
    html,
  });
  
  return Response.json(result);
}
```

### Example 2: Send Email from Client Component

```typescript
'use client';

import { sendEmailViaAPI } from '@/lib/email-service';
import { orderConfirmationTemplate } from '@/lib/email-templates';

export default function CheckoutButton() {
  const handleOrderConfirmation = async () => {
    try {
      const emailHtml = orderConfirmationTemplate(
        'ORD-12345',
        'John Doe',
        [
          { name: 'Headphones', quantity: 2, price: 299.99 },
          { name: 'Speaker', quantity: 1, price: 599.99 },
        ],
        1199.97
      );

      await sendEmailViaAPI({
        to: 'customer@example.com',
        subject: 'Order Confirmation - Order #ORD-12345',
        html: emailHtml,
      });

      console.log('Confirmation email sent!');
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  return (
    <button onClick={handleOrderConfirmation}>
      Send Confirmation Email
    </button>
  );
}
```

### Example 3: Send Email from Server Action (Next.js 14+)

```typescript
// src/app/actions/email.ts
'use server';

import { sendEmail } from '@/lib/email';
import { orderConfirmationTemplate } from '@/lib/email-templates';

export async function sendOrderConfirmationEmail(
  orderNumber: string,
  customerEmail: string,
  customerName: string,
  items: Array<{ name: string; quantity: number; price: number }>,
  total: number
) {
  const html = orderConfirmationTemplate(
    orderNumber,
    customerName,
    items,
    total
  );

  return await sendEmail({
    to: customerEmail,
    subject: `Order Confirmation - Order #${orderNumber}`,
    html,
  });
}
```

### Example 4: Send Simple Email

```typescript
import { sendEmail } from '@/lib/email';

// Simple text email
await sendEmail({
  to: 'recipient@example.com',
  subject: 'Hello from Audiophile',
  text: 'This is a plain text email.',
});

// HTML email
await sendEmail({
  to: 'recipient@example.com',
  subject: 'Hello from Audiophile',
  html: '<h1>Hello</h1><p>This is an HTML email.</p>',
});
```

### Example 5: Send to Multiple Recipients

```typescript
await sendEmail({
  to: ['user1@example.com', 'user2@example.com'],
  subject: 'Newsletter',
  html: '<p>Newsletter content...</p>',
});
```

## 3. Integration with Checkout Page

Here's how you could integrate it into your checkout flow:

```typescript
'use client';

import { useCart } from '@/context/CartContext';
import { sendEmailViaAPI } from '@/lib/email-service';
import { orderConfirmationTemplate } from '@/lib/email-templates';

export default function CheckoutForm() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process order...
    const orderNumber = `ORD-${Date.now()}`;
    
    // Send confirmation email
    const emailHtml = orderConfirmationTemplate(
      orderNumber,
      'Customer Name',
      cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice
    );

    try {
      await sendEmailViaAPI({
        to: email,
        subject: `Order Confirmation - Order #${orderNumber}`,
        html: emailHtml,
      });
      
      clearCart();
      // Redirect to confirmation page
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  // ... rest of component
}
```

## 4. Testing Email Connection

You can test your email configuration by creating a test route:

```typescript
// src/app/api/test-email/route.ts
import { NextResponse } from 'next/server';
import { verifyEmailConnection, sendEmail } from '@/lib/email';

export async function GET() {
  const isConnected = await verifyEmailConnection();
  
  if (!isConnected) {
    return NextResponse.json({ error: 'Email connection failed' }, { status: 500 });
  }

  // Send a test email
  const result = await sendEmail({
    to: process.env.SMTP_USER!, // Send to yourself
    subject: 'Test Email from Audiophile',
    html: '<h1>Test Email</h1><p>If you receive this, your email setup is working!</p>',
  });

  return NextResponse.json(result);
}
```

Visit `/api/test-email` to test your configuration.

## 5. Available Files

- `src/lib/email.ts` - Main email configuration and send function
- `src/lib/email-service.ts` - Client-side API wrapper
- `src/lib/email-templates.ts` - Reusable email templates
- `src/app/api/send-email/route.ts` - API route for sending emails

## 6. Troubleshooting

### Gmail Issues:
- Make sure you're using an **App Password**, not your regular password
- Check that 2-Step Verification is enabled
- If still failing, try enabling "Less secure app access" (not recommended)

### Common Errors:
- **"Invalid login"**: Check your credentials
- **"Connection timeout"**: Check firewall/proxy settings
- **"Authentication failed"**: Use App Password for Gmail

### Security Notes:
- Never commit `.env.local` to git (it's already in `.gitignore`)
- Use environment variables for all sensitive data
- Consider using a dedicated email service (SendGrid, Mailgun) for production

