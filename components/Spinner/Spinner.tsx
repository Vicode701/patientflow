import { FC } from 'react';

interface Props {
  size?: string;
  className?: string;
}

const Spinner = ({ size = '1em', className = '' }: Props) => {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 50 50"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`animate-spin ${className}`}
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="12" y1="2" x2="12" y2="6"></line>
      <line x1="12" y1="18" x2="12" y2="22"></line>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
      <line x1="2" y1="12" x2="6" y2="12"></line>
      <line x1="18" y1="12" x2="22" y2="12"></line>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>

        
      {/* <circle cx="10" cy="10" r="1" fill="black" />
      <circle cx="10" cy="20" r="1" fill="black" />
      <circle cx="10" cy="30" r="1" fill="black" />
      <circle cx="10" cy="40" r="1" fill="black" />
      <circle cx="10" cy="50" r="1" fill="black" />
      <circle cx="10" cy="60" r="1" fill="black" />
      <circle cx="10" cy="70" r="1" fill="black" />
      <circle cx="10" cy="80" r="1" fill="black" />
      <circle cx="10" cy="90" r="1" fill="black" />

      <circle cx="20" cy="10" r="1" fill="black" />
      <circle cx="30" cy="10" r="1" fill="black" />
      <circle cx="40" cy="10" r="1" fill="black" />
      <circle cx="50" cy="10" r="1" fill="black" />
      <circle cx="60" cy="10" r="1" fill="black" />

      <circle cx="30" cy="10" r="1" fill="black" />
      <circle cx="30" cy="10" r="1" fill="black" />
      <circle cx="30" cy="10" r="1" fill="black" />
      <circle cx="30" cy="10" r="1" fill="black" />
      <circle cx="30" cy="10" r="1" fill="black" />
      <circle cx="30" cy="10" r="1" fill="black" />
      
      
      <circle cx="40" cy="10" r="1" fill="black" />
      <circle cx="50" cy="10" r="1" fill="black" />
      <circle cx="60" cy="20" r="1" fill="black" />
      <circle cx="70" cy="30" r="1" fill="black" />
      <circle cx="70" cy="40" r="1" fill="black" />
      <circle cx="70" cy="50" r="1" fill="black" />
      <circle cx="60" cy="60" r="1" fill="black" />
      <circle cx="50" cy="70" r="1" fill="black" />
      <circle cx="40" cy="70" r="1" fill="black" />
      <circle cx="30" cy="70" r="1" fill="black" />
      <circle cx="20" cy="70" r="1" fill="black" /> */}
    </svg>
  );
};

export default Spinner;
