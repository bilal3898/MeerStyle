// src/reportWebVitals.js

const reportWebVitals = (metric) => {
  // Log the metric to the console (this can be useful for local development)
  console.log(metric);

  // Optionally, send the metrics to an analytics endpoint for production tracking
  // Example: sending metrics to a custom API or service
  if (process.env.NODE_ENV === 'production') {
    // Replace with your analytics service endpoint
    const analyticsEndpoint = 'https://your-analytics-api.com/metrics';
    
    // Send the data using the Fetch API or any HTTP client
    fetch(analyticsEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        label: metric.label,
        delta: metric.delta,
        browser: navigator.userAgent,
        timestamp: Date.now(),
      }),
    }).catch((error) => {
      console.error('Error sending web vitals to analytics service:', error);
    });
  }
};

export default reportWebVitals;
