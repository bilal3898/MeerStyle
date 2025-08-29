// src/lib/constants/index.js

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api/v1';

// Minimal country/state data for forms. Extend as needed.
export const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'IN', name: 'India' },
  { code: 'GB', name: 'United Kingdom' },
];

export const STATES = {
  US: [
    { code: 'CA', name: 'California' },
    { code: 'NY', name: 'New York' },
  ],
  IN: [
    { code: 'MH', name: 'Maharashtra' },
    { code: 'DL', name: 'Delhi' },
  ],
  GB: [
    { code: 'ENG', name: 'England' },
    { code: 'SCT', name: 'Scotland' },
  ],
};

