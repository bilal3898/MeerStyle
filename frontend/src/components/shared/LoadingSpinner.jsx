export default function LoadingSpinner({ 
  size = 'medium', 
  color = 'primary',
  variant = 'ring',
  className 
}) {
  const sizes = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const colors = {
    primary: 'text-blue-600',
    white: 'text-white',
    gray: 'text-gray-600'
  };

  const variants = {
    ring: (
      <svg
        className={`animate-spin ${sizes[size]} ${colors[color]} ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="status"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    ),
    dots: (
      <div className={`flex items-center justify-center space-x-2 ${className}`}>
        <div className={`${sizes[size]} ${colors[color]} animate-bounce-circle-1`} />
        <div className={`${sizes[size]} ${colors[color]} animate-bounce-circle-2`} />
        <div className={`${sizes[size]} ${colors[color]} animate-bounce-circle-3`} />
      </div>
    )
  };

  return variants[variant];
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'white', 'gray']),
  variant: PropTypes.oneOf(['ring', 'dots']),
  className: PropTypes.string
};