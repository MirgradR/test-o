// src/components/Button/Button.tsx
import type { ReactNode } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  isLoading?: boolean
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function Button({
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  children,
  disabled,
  className = '',
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${className}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      onClick={onClick}
    >
      {isLoading ? <span className="btn__spinner" /> : children}
    </button>
  )
}
