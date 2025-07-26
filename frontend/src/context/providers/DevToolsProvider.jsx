import { useEffect } from 'react';
import { useAuth } from '../core/AuthContext';
import { useCart } from '../core/CartContext';
import { useTheme } from '../ui/ThemeContext';

export function DevToolsProvider({ children }) {
  // Only enable in development
  if (process.env.NODE_ENV !== 'development') {
    return children;
  }

  return (
    <DevToolsWrapper>
      {children}
      <DevToolsPanel />
    </DevToolsWrapper>
  );
}

function DevToolsWrapper({ children }) {
  return <div className="devtools-layout">{children}</div>;
}

function DevToolsPanel() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { theme, toggleTheme } = useTheme();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'd') {
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleTheme]);

  return (
    <div className="devtools-panel">
      <h3>Development Tools</h3>
      
      <div className="section">
        <h4>User</h4>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <button onClick={logout}>Force Logout</button>
      </div>

      <div className="section">
        <h4>Cart</h4>
        <pre>{JSON.stringify(cart, null, 2)}</pre>
      </div>

      <div className="section">
        <h4>Theme</h4>
        <button onClick={toggleTheme}>
          Toggle Theme (Current: {theme})
        </button>
      </div>
    </div>
  );
}