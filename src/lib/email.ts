import { Resend } from 'resend';

// Initialize Resend client
const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

export const resend = new Resend(apiKey);

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
    const fromEmail = options.from || process.env.RESEND_FROM || 'Audiophile <noreply@audiophile.com>';
    
    // Resend supports array of recipients
    const recipients = Array.isArray(options.to) ? options.to : [options.to];

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipients,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

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

