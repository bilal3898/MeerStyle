'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppleLogin } from '@invertase/react-apple-authentication';
import { toast } from 'react-hot-toast';

export default function AppleAuth() {
  const router = useRouter();
  const { login } = useAppleLogin({
    clientId: 'com.your-app.service',
    scope: 'name email',
    redirectURI: 'https://your-domain.com/auth/apple/callback',
  });

  const handleLogin = async () => {
    try {
      const response = await login();
      await handleAppleResponse(response);
    } catch (error) {
      toast.error('Apple login failed');
    }
  };

  const handleAppleResponse = async (data) => {
    const res = await fetch('/api/v1/auth/apple', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    // Handle response
  };

  return (
    <button 
      onClick={handleLogin}
      className="w-full bg-black text-white p-2 rounded flex items-center justify-center gap-2"
    >
      <AppleLogoIcon className="w-5 h-5" />
      Continue with Apple
    </button>
  );
}