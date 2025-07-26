'use client';
import { useContext, useState } from 'react';
import { ModalContext } from '@/context/ModalContext';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleLogin, AppleLogin } from '@/components/auth';

export default function LoginModal() {
  const { closeModal, modalType } = useContext(ModalContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [authError, setAuthError] = useState('');

  const onSubmit = async (data) => {
    try {
      // Implement login API call
      console.log('Login data:', data);
      closeModal();
    } catch (error) {
      setAuthError('Invalid email or password');
    }
  };

  return (
    <AnimatePresence>
      {modalType === 'login' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white rounded-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close login"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="w-full p-2 border rounded"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Minimum 6 characters'
                    }
                  })}
                  className="w-full p-2 border rounded"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {authError && (
                <p className="text-red-500 text-sm">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700"
              >
                Sign In
              </button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t"></div>
              <span className="px-4 text-gray-500 text-sm">OR</span>
              <div className="flex-1 border-t"></div>
            </div>

            <div className="space-y-3">
              <GoogleLogin />
              <AppleLogin />
            </div>

            <p className="text-center mt-6 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => openModal('register')}
                className="text-blue-600 hover:underline"
              >
                Create Account
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}