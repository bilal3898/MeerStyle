'use client';
import { useForm } from 'react-hook-form';
import { BodyPartGuidance } from './MeasurementVisualizer';
import { BODY_MEASUREMENTS } from '@/lib/constants/bodyMeasurements'; // Importing measurement constants

export default function ManualInputForm({ garmentType, onMeasurementsSubmit }) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const measurements = watch();

  const measurementFields = {
    shirt: ['chest', 'waist', 'shoulder', 'sleeve', 'length'],
    pants: ['waist', 'hip', 'inseam', 'outseam', 'thigh'],
    // Add more garment types
  };

  const validateMeasurement = (value) => {
    const num = parseInt(value);
    if (isNaN(num)) return 'Must be a number';
    if (num < 20 || num > 200) return 'Invalid measurement (20-200cm)';
    return true;
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit(onMeasurementsSubmit)} className="space-y-4">
        <h2 className="text-2xl font-bold mb-6">Body Measurements</h2>
        
        {measurementFields[garmentType].map((part) => (
          <div key={part} className="space-y-2">
            <label className="block text-sm font-medium capitalize">
              {part.replace('_', ' ')}
              <span className="text-xs text-gray-500 ml-2">(in cm)</span>
            </label>
            <input
              type="number"
              {...register(part, { validate: validateMeasurement })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors[part] && (
              <p className="text-red-500 text-sm">{errors[part].message}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700 mt-6"
        >
          Save Measurements
        </button>
      </form>

      <BodyPartGuidance 
        measurements={measurements}
        garmentType={garmentType}
      />
    </div>
  );
}