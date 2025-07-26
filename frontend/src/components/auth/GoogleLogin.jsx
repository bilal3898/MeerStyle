'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-hot-toast';

export default function GoogleAuth() {
  const router = useRouter();

  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch('/api/v1/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential })
      });
      
      if(response.ok) {
        toast.success('Google login successful!');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="mt-4">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => toast.error('Google login failed')}
        useOneTap
        theme="filled_blue"
        size="large"
        text="continue_with"
        shape="rectangular"
      />
    </div>
  );
}