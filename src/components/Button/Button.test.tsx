// src/components/Button/Button.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('should render with text', () => {
    render(<Button>Click me</Button>)
    
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('should apply variant class', () => {
    render(<Button variant="danger">Delete</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn--danger')
  })

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn() // мок-функция
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click</Button>)
    
    await user.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when loading', () => {
    render(<Button isLoading>Loading</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
  })

  it('should show spinner when loading', () => {
    render(<Button isLoading>Submit</Button>)
    
    expect(screen.queryByText('Submit')).not.toBeInTheDocument()
    expect(document.querySelector('.btn__spinner')).toBeInTheDocument()
  })

  it('should not call onClick when disabled', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick} disabled>Click</Button>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
