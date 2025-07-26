import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to MeerStyle</h1>
      <p>Custom Tailored Clothing</p>
      <nav>
        <a href="/login" style={{ margin: '10px', padding: '10px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Login
        </a>
        <a href="/register" style={{ margin: '10px', padding: '10px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Register
        </a>
        <a href="/custom-order" style={{ margin: '10px', padding: '10px', backgroundColor: '#ffc107', color: 'black', textDecoration: 'none', borderRadius: '5px' }}>
          Custom Order
        </a>
      </nav>
    </div>
  );
}

function LoginPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Login</h1>
      <p>Login page placeholder</p>
      <a href="/" style={{ padding: '10px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Back to Home
      </a>
    </div>
  );
}

function RegisterPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Register</h1>
      <p>Register page placeholder</p>
      <a href="/" style={{ padding: '10px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Back to Home
      </a>
    </div>
  );
}

function CustomOrderPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Custom Order</h1>
      <p>Custom order page placeholder</p>
      <a href="/" style={{ padding: '10px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Back to Home
      </a>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/custom-order" element={<CustomOrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
