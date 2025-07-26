export default function CardIcon({ type, className }) {
  const icons = {
    visa: 'VISA',
    mastercard: 'MC',
    amex: 'AMEX',
    generic: '••••'
  };

  return (
    <div className={`bg-white p-1 rounded text-xs font-bold ${className}`}>
      {icons[type] || icons.generic}
    </div>
  );
}