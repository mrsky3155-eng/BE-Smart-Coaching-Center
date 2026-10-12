import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const InstituteLogo: React.FC<LogoProps> = ({ className = '', size = 44 }) => (
  <img
    src="./images/logo.png"
    alt="Be Smart Coaching Center Pvt. Ltd. logo"
    width={size}
    height={size}
    className={`shrink-0 rounded-full bg-white object-cover ${className}`}
    style={{ width: size, height: size }}
  />
);
