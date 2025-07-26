'use client';
import { useForm } from 'react-hook-form';
import { COUNTRIES, STATES } from '@/lib/constants';
import { useCallback, useEffect } from 'react';

export default function AddressForm({ defaultValues, onSubmit }) {
  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue,
    formState: { errors }
  } = useForm({ defaultValues });

  const country = watch('country');
  
  // Update state options when country changes
  useEffect(() => {
    setValue('state', '');
  }, [country, setValue]);

  const formatPhone = useCallback((value) => {
    return value.replace(/[^\d]/g, '')
      .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register('fullName', { required: 'Required field' })}
          className="w-full p-2 border rounded"
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">
          Street Address <span className="text-red-500">*</span>
        </label>
        <input
          {...register('address1', { required: 'Required field' })}
          className="w-full p-2 border rounded"
        />
        {errors.address1 && <p className="text-red-500 text-sm">{errors.address1.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Apartment/Suite</label>
        <input
          {...register('address2')}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          City <span className="text-red-500">*</span>
        </label>
        <input
          {...register('city', { required: 'Required field' })}
          className="w-full p-2 border rounded"
        />
        {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Country <span className="text-red-500">*</span>
        </label>
        <select
          {...register('country', { required: 'Required field' })}
          className="w-full p-2 border rounded bg-white"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          State <span className="text-red-500">*</span>
        </label>
        <select
          {...register('state', { required: 'Required field' })}
          className="w-full p-2 border rounded bg-white"
          disabled={!country}
        >
          <option value="">Select State</option>
          {STATES[country]?.map((s) => (
            <option key={s.code} value={s.code}>{s.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          ZIP Code <span className="text-red-500">*</span>
        </label>
        <input
          {...register('zipCode', { 
            required: 'Required field',
            pattern: {
              value: /^\d{5}(-\d{4})?$/,
              message: 'Invalid ZIP code'
            }
          })}
          className="w-full p-2 border rounded"
        />
        {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          {...register('phone', {
            required: 'Required field',
            pattern: {
              value: /^\(\d{3}\) \d{3}-\d{4}$/,
              message: 'Invalid phone format'
            }
          })}
          onChange={(e) => {
            const formatted = formatPhone(e.target.value);
            e.target.value = formatted;
          }}
          className="w-full p-2 border rounded"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700"
        >
          Save Address
        </button>
      </div>
    </form>
  );
}