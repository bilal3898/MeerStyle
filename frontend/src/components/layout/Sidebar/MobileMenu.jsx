'use client';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../Header/CartIcon';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileMenu({ isOpen, onClose }) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if(isOpen) {
      document.body.style.overflow = 'hidden';
      return () => document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Menu</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <nav className="space-y-4">
                {['Custom Order', 'Ready to Wear', 'Fabrics', 'Orders'].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="block px-4 py-2.5 hover:bg-gray-50 rounded-lg font-medium"
                    onClick={onClose}
                  >
                    {item}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 border-t pt-4">
                <CartIcon />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}