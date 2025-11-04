import { Resend } from 'resend';
import type { CreateEmailOptions } from 'resend';
import { buildOrderConfirmationEmail, ShippingDetails } from './email-templates';

// Initialize Resend client
const apiKey = process.env.RESEND_API_KEY;
// Do not throw at import-time; initialize lazily
export const resend = apiKey ? new Resend(apiKey) : undefined as unknown as Resend;

// Email template types
export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
}

// Verify Resend connection (check if API key is valid)
export async function verifyEmailConnection() {
  try {
    // Resend doesn't have a direct verify method, but we can test with a simple API call
    // For now, we'll just check if the API key exists
    if (!apiKey) {
      return false;
    }
    console.log('Email server is ready to send messages');
    return true;
  } catch (error) {
    console.error('Email server verification failed:', error);
    return false;
  }
}

// Send email function using Resend
export async function sendEmail(options: EmailOptions) {
  try {
    if (!apiKey) {
      return { success: false, error: 'Email service not configured (missing RESEND_API_KEY)' } as {
        success: false;
        error: string;
      };
    }
    // Use a safe default from for testing if RESEND_FROM is not configured
    const fromEmail = options.from || process.env.RESEND_FROM || 'onboarding@resend.dev';
    
    // Resend supports string or string[] for recipients
    const recipients = Array.isArray(options.to) ? options.to : [options.to];

    // Ensure at least html or text is provided
    if (!options.html && !options.text) {
      throw new Error('Either html or text content must be provided');
    }

    // Build email payload using the non-template union of CreateEmailOptions
    const toField: string | string[] = recipients.length === 1 ? recipients[0] : recipients;
    const emailPayload: CreateEmailOptions = options.html
      ? {
          from: fromEmail,
          to: toField,
          subject: options.subject,
          html: options.html,
        }
      : {
          from: fromEmail,
          to: toField,
          subject: options.subject,
          text: options.text!,
        };

    const { data, error } = await (resend as Resend).emails.send(emailPayload);

    if (error) {
      console.error('Error sending email:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : JSON.stringify(error) 
      };
    }

    console.log('Email sent:', data?.id);
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function sendOrderConfirmationEmail(params: {
  to: string;
  customerName: string;
  orderId: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  grandTotal: number;
  shipping: ShippingDetails;
  orderUrl: string;
  from?: string;
}) {
  if (!apiKey) {
    return { success: false, error: 'Email service not configured (missing RESEND_API_KEY)' } as {
      success: false;
      error: string;
    };
  }
  // Use a safe default from for testing if RESEND_FROM is not configured
  const fromEmail = params.from || process.env.RESEND_FROM || 'onboarding@resend.dev';
  const html = buildOrderConfirmationEmail({
    orderId: params.orderId,
    customerName: params.customerName,
    items: params.items,
    grandTotal: params.grandTotal,
    shipping: params.shipping,
    orderUrl: params.orderUrl,
    supportEmail: process.env.SUPPORT_EMAIL,
    supportPhone: process.env.SUPPORT_PHONE,
  });

  const payload: CreateEmailOptions = {
    from: fromEmail,
    to: params.to,
    subject: `Your Audiophile Order ${params.orderId}`,
    html,
  };

  const { data, error } = await (resend as Resend).emails.send(payload);
  if (error) {
    return { success: false, error: error instanceof Error ? error.message : JSON.stringify(error) };
  }
  return { success: true, messageId: data?.id };
}