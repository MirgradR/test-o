import { describe, it, expect } from 'vitest'
import { formatPrice, calculateDiscount } from './formatPrice'

describe('formatPrice', () => {
  it('should format price in RUB by default', () => {
    const result = formatPrice(1234.56)
    expect(result).toBe('1 234,56 ₽')
  })

  it('should format price in EUR', () => {
    const result = formatPrice(1234.56, 'EUR')
    expect(result).toBe('1 234,56 €')
  })

  it('should handle zero', () => {
    expect(formatPrice(0)).toBe('0,00 ₽')
  })
})

describe('calculateDiscount', () => {
  it('should calculate 10% discount', () => {
    expect(calculateDiscount(100, 10)).toBe(90)
  })

    it('should calculate 30% discount', () => {
    expect(calculateDiscount(9550, 30)).toBe(6685)
  })

  it('should throw error for invalid discount', () => {
    expect(() => calculateDiscount(100, -10)).toThrow('Discount must be between 0 and 100')
  })

  it('should throw error for discount over 100', () => {
    expect(() => calculateDiscount(100, 150)).toThrow()
  })
})
