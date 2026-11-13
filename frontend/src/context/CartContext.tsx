import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { CartLine, Product } from '../types'

const KEY = 'nova-cart'

type CartContextValue = {
  items: CartLine[]
  count: number
  subtotal: number
  add: (product: Product, quantity?: number) => void
  setQuantity: (productId: number, quantity: number) => void
  remove: (productId: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function readCart(): CartLine[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(readCart)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, line) => sum + line.quantity, 0)
    const subtotal = items.reduce((sum, line) => sum + line.product.price * line.quantity, 0)
    return {
      items,
      count,
      subtotal,
      add(product, quantity = 1) {
        setItems((current) => {
          const existing = current.find((line) => line.product.id === product.id)
          if (!existing) return [...current, { product, quantity }]
          return current.map((line) =>
            line.product.id === product.id
              ? { ...line, product, quantity: Math.min(line.quantity + quantity, product.stock || line.quantity + quantity) }
              : line,
          )
        })
      },
      setQuantity(productId, quantity) {
        setItems((current) =>
          current
            .map((line) => (line.product.id === productId ? { ...line, quantity } : line))
            .filter((line) => line.quantity > 0),
        )
      },
      remove(productId) {
        setItems((current) => current.filter((line) => line.product.id !== productId))
      },
      clear() {
        setItems([])
      },
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
