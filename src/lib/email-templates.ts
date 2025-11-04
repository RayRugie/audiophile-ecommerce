// Email templates for common use cases
import { formatPrice } from './utils';

export function orderConfirmationTemplate(orderNumber: string, customerName: string, items: Array<{ name: string; quantity: number; price: number }>, total: number) {
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #d87d4a; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .total { font-weight: bold; font-size: 1.2em; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
          </div>
          <div class="content">
            <p>Dear ${customerName},</p>
            <p>Thank you for your order! Your order #${orderNumber} has been confirmed.</p>
            
            <h2>Order Details</h2>
            <table>
              <thead>
                <tr style="background-color: #ddd;">
                  <th style="padding: 10px; text-align: left;">Item</th>
                  <th style="padding: 10px; text-align: center;">Quantity</th>
                  <th style="padding: 10px; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr class="total">
                  <td colspan="2" style="padding: 10px; text-align: right;">Total:</td>
                  <td style="padding: 10px; text-align: right;">$${total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
            
            <p>We'll send you a shipping confirmation once your order is on its way.</p>
            <p>Best regards,<br>Audiophile Team</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export interface ShippingDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export function buildOrderConfirmationEmail(params: {
  orderId: string;
  customerName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  grandTotal: number;
  shipping: ShippingDetails;
  orderUrl: string;
  supportEmail?: string;
  supportPhone?: string;
}) {
  const { orderId, customerName, items, grandTotal, shipping, orderUrl } = params;
  const supportEmail = params.supportEmail || 'support@audiophile.com';
  const supportPhone = params.supportPhone || '+1 (555) 010-0000';

  const itemsRows = items.map((i) => `
      <tr>
        <td style="padding:12px 8px;border-bottom:1px solid #eee;">${i.name}</td>
        <td style="padding:12px 8px;border-bottom:1px solid #eee;text-align:center;">x${i.quantity}</td>
        <td style="padding:12px 8px;border-bottom:1px solid #eee;text-align:right;">${formatPrice(i.price)}</td>
      </tr>
  `).join('');

  return `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Order Confirmation</title>
      <style>
        body{margin:0;padding:0;background:#f6f6f6;font-family:Arial,Helvetica,sans-serif;color:#111827}
        .container{max-width:640px;margin:0 auto;padding:24px}
        .card{background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.06)}
        .header{background:#D87D4A;color:#fff;padding:24px;text-align:center}
        .content{padding:24px}
        .muted{color:#6B7280}
        .h1{font-size:24px;margin:0 0 8px 0}
        .h2{font-size:16px;margin:24px 0 8px 0}
        table{width:100%;border-collapse:collapse}
        .total{background:#000;color:#fff;border-radius:8px;padding:16px;margin-top:8px;text-align:right}
        .btn{display:inline-block;background:#D87D4A;color:#fff;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:6px}
        .grid{display:grid;grid-template-columns:1fr;gap:16px}
        @media(min-width:560px){.grid{grid-template-columns:2fr 1fr}}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <h1 class="h1">Thank you for your order</h1>
            <div class="muted">Order ID: ${orderId}</div>
          </div>
          <div class="content">
            <p>Hi ${customerName},</p>
            <p class="muted">We’re processing your order. Your receipt and order details are below.</p>

            <div class="grid">
              <div>
                <h2 class="h2">Items</h2>
                <table>
                  <thead>
                    <tr style="background:#F3F4F6">
                      <th style="text-align:left;padding:12px 8px">Item</th>
                      <th style="text-align:center;padding:12px 8px">Qty</th>
                      <th style="text-align:right;padding:12px 8px">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsRows}
                  </tbody>
                </table>
              </div>
              <div>
                <h2 class="h2">Grand Total</h2>
                <div class="total">${formatPrice(grandTotal)}</div>
              </div>
            </div>

            <h2 class="h2">Shipping Details</h2>
            <table style="width:100%;margin-bottom:16px">
              <tbody>
                <tr><td class="muted">Name</td><td style="text-align:right">${shipping.name}</td></tr>
                <tr><td class="muted">Email</td><td style="text-align:right">${shipping.email}</td></tr>
                <tr><td class="muted">Phone</td><td style="text-align:right">${shipping.phone}</td></tr>
                <tr><td class="muted">Address</td><td style="text-align:right">${shipping.address}, ${shipping.city}, ${shipping.zipCode}, ${shipping.country}</td></tr>
              </tbody>
            </table>

            <p style="margin:24px 0">
              <a class="btn" href="${orderUrl}" target="_blank" rel="noopener noreferrer">View your order</a>
            </p>

            <p class="muted">Need help? Contact us at <a href="mailto:${supportEmail}">${supportEmail}</a> or call ${supportPhone}.</p>
          </div>
        </div>
      </div>
    </body>
  </html>`;
}

export function contactFormTemplate(name: string, email: string, message: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #d87d4a; color: white; padding: 20px; }
          .content { padding: 20px; background-color: #f9f9f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

