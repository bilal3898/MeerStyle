import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to MeerStyle</h1>
      <p>Custom Tailored Clothing</p>
      <nav>
        <Link to="/login" style={{ margin: '10px', padding: '10px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Login
        </Link>
        <Link to="/register" style={{ margin: '10px', padding: '10px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Register
        </Link>
        <Link to="/custom-order" style={{ margin: '10px', padding: '10px', backgroundColor: '#ffc107', color: 'black', textDecoration: 'none', borderRadius: '5px' }}>
          Custom Order
        </Link>
      </nav>
    </div>
  );
}

function LoginPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Login</h1>
      <p>Login page placeholder</p>
      <Link to="/" style={{ padding: '10px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Back to Home
      </Link>
    </div>
  );
}

function RegisterPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Register</h1>
      <p>Register page placeholder</p>
      <Link to="/" style={{ padding: '10px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Back to Home
      </Link>
    </div>
  );
}

function CustomOrderPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Custom Order</h1>
      <p>Custom order page placeholder</p>
      <Link to="/" style={{ padding: '10px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Back to Home
      </Link>
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
