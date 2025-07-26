import { ROUTES } from '@/lib/constants/routes';
import { useAuth } from '@/src/hooks/useAuth';
import Link from 'next/link';
import { useState } from 'react';
import CartIcon from './CartIcon';
import SearchBar from './SearchBar';

export default function NavBar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              MeerStyle
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <SearchBar />

            <CartIcon />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
          <NavLinks mobile />
          <div className="px-2">
            <SearchBar mobile />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLinks({ mobile }) {
  return (
    <div className={`${mobile ? 'space-y-1' : 'flex space-x-4'}`}>
      {['Custom Order', 'Ready to Wear', 'Fabrics', 'Orders'].map((item) => (
        <Link
          key={item}
          href={`/${item.toLowerCase().replace(' ', '-')}`}
          className={`block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 ${
            mobile ? 'text-base' : 'text-sm'
          }`}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}