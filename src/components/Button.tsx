import React from 'react';
import Link from 'next/link';

/**
 * Button Component
 *
 * A flexible, customizable button component that supports multiple variants and use cases.
 *
 * @example
 * // Primary button
 * <Button variant="primary" onClick={handleClick}>Click me</Button>
 *
 * @example
 * // Link button
 * <Button variant="link" href="/about">Go to About</Button>
 *
 * @example
 * // Loading state
 * <Button variant="primary" loading={true}>Submitting...</Button>
 *
 * @example
 * // Different sizes
 * <Button variant="primary" size="lg">Large Button</Button>
 * <Button variant="primary" size="sm">Small Button</Button>
 *
 * @example
 * // Full width
 * <Button variant="primary" fullWidth>Full Width Button</Button>
 *
 * @example
 * // Pill-shaped button (fully rounded)
 * <Button variant="primary" pill>Round Button</Button>
 */

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'link' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'ml' | 'lg' | 'xl';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  pill?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  children: React.ReactNode;
  className?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  'aria-label'?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  pill = false,
  href,
  type = 'button',
  onClick,
  children,
  className = '',
  target,
  rel,
  'aria-label': ariaLabel,
  ...props
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant classes
  const variantClasses = {
    primary: 'bg-custom-secondary hover:opacity-80 text-white shadow-sm',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-sm',
    outline: 'border border-gray-300 bg-white hover:bg-gray-300 text-gray-700',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    text: 'bg-transparent hover:bg-gray-100 text-[#343D4E] hover:text-gray-700',
    link: 'bg-transparent text-custom-primary hover:text-custom-secondary p-0 h-auto',
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-2.5 text-sm rounded-xl',
    ml: 'px-4.5 py-2.5 text-base rounded-2xl',
    lg: 'px-6 py-4 text-base rounded-2xl',
    xl: 'px-8 py-5 text-lg rounded-3xl',
  };

  // Pill class (overrides size-based border-radius)
  const pillClass = pill ? 'rounded-full' : '';

  // Width class
  const widthClass = fullWidth ? 'w-full' : '';

  // Loading class
  const loadingClass = loading ? 'cursor-wait' : '';

  // Combine all classes
  const buttonClasses = `hover:cursor-pointer ${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${pillClass} ${widthClass} ${loadingClass} ${className}`.trim();

  // If href is provided, render as Link with button inside for onClick support
  if (href) {
    return (
      <Link href={href} target={target} rel={rel} aria-label={ariaLabel}>
        <button
          type="button"
          disabled={disabled || loading}
          onClick={onClick}
          className={buttonClasses}
          {...props}
        >
          {loading && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {children}
        </button>
      </Link>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={buttonClasses}
      aria-label={ariaLabel}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;