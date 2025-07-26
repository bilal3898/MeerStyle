import { createContext, useContext, useState, useEffect } from 'react';
import { z } from 'zod';

const measurementSchema = z.object({
  chest: z.number().min(20).max(150),
  waist: z.number().min(20).max(150),
  hip: z.number().min(20).max(150),
  // Add more validations
});

const MeasurementContext = createContext();

export function MeasurementProvider({ children }) {
  const [measurements, setMeasurements] = useState(() => {
    const saved = localStorage.getItem('measurements');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [validationErrors, setValidationErrors] = useState({});

  const saveMeasurements = async (values, garmentType) => {
    try {
      measurementSchema.parse(values);
      const newMeasurements = {
        ...measurements,
        [garmentType]: values
      };
      setMeasurements(newMeasurements);
      localStorage.setItem('measurements', JSON.stringify(newMeasurements));
      setValidationErrors({});
      return true;
    } catch(error) {
      const errors = error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      setValidationErrors(errors);
      return false;
    }
  };

  const getMeasurements = (garmentType) => {
    return measurements[garmentType] || {
      chest: '',
      waist: '',
      hip: ''
    };
  };

  return (
    <MeasurementContext.Provider value={{ 
      measurements,
      saveMeasurements,
      getMeasurements,
      validationErrors 
    }}>
      {children}
    </MeasurementContext.Provider>
  );
}

export const useMeasurement = () => {
  const context = useContext(MeasurementContext);
  if(!context) throw new Error('useMeasurement must be used within MeasurementProvider');
  return context;
};