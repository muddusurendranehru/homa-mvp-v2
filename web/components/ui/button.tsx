'use client';

import Link from 'next/link';
import { ReactNode, cloneElement, isValidElement } from 'react';

interface ButtonProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
  asChild?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function Button({ 
  children, 
  size = 'md', 
  variant = 'default',
  asChild = false,
  className = '',
  href,
  onClick
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-xl'
  };

  const variantClasses = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-700',
    outline: 'border-2 border-current hover:bg-current/10'
  };

  const baseClasses = `inline-block font-semibold rounded-lg transition-all duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  // If asChild is true, clone the child element and add className
  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<any>, {
      className: `${baseClasses} ${(children as any).props?.className || ''}`,
    });
  }

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
