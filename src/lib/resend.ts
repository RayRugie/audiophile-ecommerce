import { resend } from './email';

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmation(
  to: string,
  orderId: string,
  orderTotal: number
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Audiophile <noreply@audiophile.com>',
      to,
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Thank You for Your Order!</h2>
          <p>Your order #${orderId} has been confirmed.</p>
          <p>Total: $${orderTotal.toFixed(2)}</p>
          <p>We'll send you a shipping confirmation once your items have shipped.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

