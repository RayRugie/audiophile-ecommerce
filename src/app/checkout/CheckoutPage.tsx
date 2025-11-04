'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import './CheckoutPage.scss';

import { useCart } from '@/context/CartContext';
import { VAT_RATE } from '@/lib/constants';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRouter } from 'next/navigation';
import { generateOrderId } from '@/lib/utils';

export default function CheckoutPage() {
  const { cartItems, totalPrice } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: 'Alexei Ward',
    email: 'alexei@mail.com',
    phone: '+1 202-555-0136',
    address: '1137 Williams Avenue',
    zipCode: '10001',
    city: 'New York',
    country: 'United States',
    paymentMethod: 'e-money',
    eMoneyNumber: '238521993',
    eMoneyPin: '6891'
  });

  const subtotal = totalPrice;
  const shipping = subtotal > 0 ? 50 : 0;
  const vat = useMemo(() => Math.round(subtotal * VAT_RATE), [subtotal]);
  const grandTotal = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method: 'e-money' | 'cash') => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0 || submitting) return;

    setSubmitting(true);
    try {
      const orderId = generateOrderId();

      // Prepare email payload
      const items = cartItems.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price }));
      const shippingDetails = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        country: formData.country,
      };

      // Send confirmation email via server route
      try {
        await fetch('/api/order-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: formData.email,
            customerName: formData.name,
            orderId,
            items,
            grandTotal,
            shipping: shippingDetails,
            orderUrl: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/confirmation?orderId=${encodeURIComponent(orderId)}&grandTotal=${grandTotal}`,
          }),
        });
      } catch (err) {
        console.error('Email send failed', err);
      }

      // Navigate to confirmation
      router.push(`/confirmation?orderId=${encodeURIComponent(orderId)}&grandTotal=${grandTotal}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout">
      <Header />
      <div className="checkout__container">
        <form className="checkout__form" onSubmit={handleSubmit}>
          <h1 className="checkout__title">CHECKOUT</h1>

          <section className="checkout__section">
            <h2 className="checkout__sectionTitle">BILLING DETAILS</h2>
            
            <div className="checkout__formGrid">
              <div className="checkout__formGroup">
                <label htmlFor="name" className="checkout__label">Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  className="checkout__input" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Alexei Ward"
                />
              </div>

              <div className="checkout__formGroup">
                <label htmlFor="email" className="checkout__label">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  className="checkout__input" 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="alexei@mail.com"
                />
              </div>

              <div className="checkout__formGroup">
                <label htmlFor="phone" className="checkout__label">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  className="checkout__input" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 202-555-0136"
                />
              </div>
            </div>
          </section>

          <section className="checkout__section">
            <h2 className="checkout__sectionTitle">SHIPPING INFO</h2>
            
            <div className="checkout__formGroup checkout__formGroup--full">
              <label htmlFor="address" className="checkout__label">Address</label>
              <input 
                type="text" 
                id="address"
                name="address"
                className="checkout__input" 
                value={formData.address}
                onChange={handleInputChange}
                placeholder="1137 Williams Avenue"
              />
            </div>

            <div className="checkout__formGrid">
              <div className="checkout__formGroup">
                <label htmlFor="zipCode" className="checkout__label">ZIP Code</label>
                <input 
                  type="text" 
                  id="zipCode"
                  name="zipCode"
                  className="checkout__input" 
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="10001"
                />
              </div>

              <div className="checkout__formGroup">
                <label htmlFor="city" className="checkout__label">City</label>
                <input 
                  type="text" 
                  id="city"
                  name="city"
                  className="checkout__input" 
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                />
              </div>

              <div className="checkout__formGroup">
                <label htmlFor="country" className="checkout__label">Country</label>
                <input 
                  type="text" 
                  id="country"
                  name="country"
                  className="checkout__input" 
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="United States"
                />
              </div>
            </div>
          </section>

          <section className="checkout__section">
            <h2 className="checkout__sectionTitle">PAYMENT DETAILS</h2>
            
            <div className="checkout__paymentGrid">
              <div className="checkout__formGroup">
                <label className="checkout__label">Payment Method</label>
              </div>

              <div className="checkout__paymentMethods">
                <div 
                  className={`checkout__paymentOption ${formData.paymentMethod === 'e-money' ? 'checkout__paymentOption--active' : ''}`}
                  onClick={() => handlePaymentMethodChange('e-money')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handlePaymentMethodChange('e-money')}
                >
                  <div className="checkout__radio">
                    {formData.paymentMethod === 'e-money' && <div className="checkout__radioInner" />}
                  </div>
                  <span>e-Money</span>
                </div>

                <div 
                  className={`checkout__paymentOption ${formData.paymentMethod === 'cash' ? 'checkout__paymentOption--active' : ''}`}
                  onClick={() => handlePaymentMethodChange('cash')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handlePaymentMethodChange('cash')}
                >
                  <div className="checkout__radio">
                    {formData.paymentMethod === 'cash' && <div className="checkout__radioInner" />}
                  </div>
                  <span>Cash on Delivery</span>
                </div>
              </div>
            </div>

            {formData.paymentMethod === 'e-money' && (
              <div className="checkout__formGrid">
                <div className="checkout__formGroup">
                  <label htmlFor="eMoneyNumber" className="checkout__label">e-Money Number</label>
                  <input 
                    type="text" 
                    id="eMoneyNumber"
                    name="eMoneyNumber"
                    className="checkout__input" 
                    value={formData.eMoneyNumber}
                    onChange={handleInputChange}
                    placeholder="238521993"
                  />
                </div>

                <div className="checkout__formGroup">
                  <label htmlFor="eMoneyPin" className="checkout__label">e-Money PIN</label>
                  <input 
                    type="text" 
                    id="eMoneyPin"
                    name="eMoneyPin"
                    className="checkout__input" 
                    value={formData.eMoneyPin}
                    onChange={handleInputChange}
                    placeholder="6891"
                  />
                </div>
              </div>
            )}
          </section>
        </form>

        <div className="checkout__summary">
          <h2 className="checkout__summaryTitle">SUMMARY</h2>

          <div className="checkout__items">
            {cartItems.map(item => (
              <div key={item.id} className="checkout__item">
                <div className="checkout__itemImage">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                  />
                </div>
                <div className="checkout__itemDetails">
                  <p className="checkout__itemName">{item.shortName || item.name}</p>
                  <p className="checkout__itemPrice">$ {item.price.toLocaleString()}</p>
                </div>
                <div className="checkout__itemQuantity">x{item.quantity}</div>
              </div>
            ))}
          </div>

          <div className="checkout__totals">
            <div className="checkout__totalRow">
              <span className="checkout__totalLabel">TOTAL</span>
              <span className="checkout__totalValue">$ {subtotal.toLocaleString()}</span>
            </div>
            <div className="checkout__totalRow">
              <span className="checkout__totalLabel">SHIPPING</span>
              <span className="checkout__totalValue">$ {shipping}</span>
            </div>
            <div className="checkout__totalRow">
              <span className="checkout__totalLabel">VAT (INCLUDED)</span>
              <span className="checkout__totalValue">$ {vat.toLocaleString()}</span>
            </div>
            <div className="checkout__totalRow checkout__totalRow--grand">
              <span className="checkout__totalLabel">GRAND TOTAL</span>
              <span className="checkout__totalValue checkout__totalValue--grand">$ {grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <button type="submit" className="checkout__button" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'PROCESSING…' : 'CONTINUE & PAY'}
          </button>
        </div>
      </div>
    </div>
  );
}

