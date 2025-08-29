// lib/hooks/useBodyMeasurements.js
import { useState, useEffect } from 'react';
import { 
  validateMeasurements,
  getRequiredMeasurementFields,
  calculateFabricRequirements
} from '../domain/measurements';

export const useBodyMeasurements = (garmentType) => {
  const [measurements, setMeasurements] = useState(() => {
    const saved = localStorage.getItem(`measurements-${garmentType}`);
    return saved ? JSON.parse(saved) : {};
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem(`measurements-${garmentType}`, JSON.stringify(measurements));
  }, [measurements, garmentType]);

  const validate = () => {
    try {
      validateMeasurements(garmentType, measurements);
      setErrors({});
      return true;
    } catch (error) {
      setErrors(error.errors || { general: error.message });
      return false;
    }
  };

  const calculateRequirements = () => {
    return calculateFabricRequirements(garmentType, measurements);
  };

  const requiredFields = getRequiredMeasurementFields(garmentType);

  return {
    measurements,
    setMeasurement: (field, value) => {
      setMeasurements(prev => ({ ...prev, [field]: Number(value) }));
    },
    validate,
    errors,
    requiredFields,
    calculateRequirements
  };
};