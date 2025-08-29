import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function SocialLinks() {
  return (
    <div className="flex gap-4 justify-center mt-6">
      <Link to="https://instagram.com" target="_blank" rel="noopener">
        <FaInstagram className="w-6 h-6 text-gray-700 hover:text-pink-600 transition-colors" />
      </Link>
      <Link to="https://facebook.com" target="_blank" rel="noopener">
        <FaFacebook className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-colors" />
      </Link>
      <Link to="https://twitter.com" target="_blank" rel="noopener">
        <FaTwitter className="w-6 h-6 text-gray-700 hover:text-blue-400 transition-colors" />
      </Link>
      <Link to="https://youtube.com" target="_blank" rel="noopener">
        <FaYoutube className="w-6 h-6 text-gray-700 hover:text-red-600 transition-colors" />
      </Link>
    </div>
  );
}