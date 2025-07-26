'use client';
import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { CardIcon } from '@/components/ui/Icons';

export default function PaymentForm({ onSubmit }) {
  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue,
    formState: { errors }
  } = useForm();

  const [cardType, setCardType] = useState('generic');
  const cardNumber = watch('cardNumber');

  const detectCardType = useCallback((number) => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    return 'generic';
  }, []);

  const formatCardNumber = useCallback((value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/);
    return match ? match.slice(1).filter(Boolean).join(' ') : '';
  }, []);

  const formatExpiry = useCallback((value) => {
    return value.replace(/^(\d{2})(\d)/, '$1/$2')
      .replace(/\/\//g, '/')
      .substring(0, 5);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="relative">
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <CardIcon type={cardType} className="w-12 h-12" />
          </div>
          
          <label className="block text-sm font-medium mb-1">
            Card Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register('cardNumber', {
              required: 'Required field',
              validate: value => {
                const cleaned = value.replace(/\s/g, '');
                return /^\d{16}$/.test(cleaned) || 'Invalid card number';
              }
            })}
            onChange={(e) => {
              const formatted = formatCardNumber(e.target.value);
              setValue('cardNumber', formatted);
              setCardType(detectCardType(formatted));
            }}
            maxLength={19}
            className="w-full p-2 border rounded pr-16"
          />
          {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Expiration Date <span className="text-red-500">*</span>
          </label>
          <input
            {...register('expiry', {
              required: 'Required field',
              pattern: {
                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: 'MM/YY format'
              }
            })}
            placeholder="MM/YY"
            onChange={(e) => {
              setValue('expiry', formatExpiry(e.target.value));
            }}
            maxLength={5}
            className="w-full p-2 border rounded"
          />
          {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            CVC <span className="text-red-500">*</span>
          </label>
          <input
            {...register('cvc', {
              required: 'Required field',
              pattern: {
                value: /^\d{3,4}$/,
                message: '3-4 digits'
              }
            })}
            type="password"
            maxLength={4}
            className="w-full p-2 border rounded"
          />
          {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Cardholder Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register('nameOnCard', { required: 'Required field' })}
          className="w-full p-2 border rounded"
        />
        {errors.nameOnCard && <p className="text-red-500 text-sm">{errors.nameOnCard.message}</p>}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700"
        >
          Save Payment Method
        </button>
      </div>

      <p className="text-sm text-gray-500">
        Your payment details are securely encrypted
      </p>
    </form>
  );
}