export default function ErrorMessage({ 
  message, 
  retry, 
  severity = 'error',
  className,
  center = false
}) {
  const colors = {
    error: 'bg-red-50 border-red-200 text-red-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700'
  };

  return (
    <div 
      className={`${colors[severity]} p-4 border-l-4 rounded ${center ? 'mx-auto' : ''} ${className}`}
      role="alert"
    >
      <div className="flex items-center">
        <svg
          className="w-5 h-5 mr-3 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>

        {retry && (
          <button
            onClick={retry}
            className="ml-4 px-3 py-1.5 text-sm font-medium rounded hover:opacity-80 transition-opacity"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  retry: PropTypes.func,
  severity: PropTypes.oneOf(['error', 'warning', 'info']),
  className: PropTypes.string,
  center: PropTypes.bool
};