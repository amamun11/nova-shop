export type Category = {
  id: number
  name: string
  slug: string
  blurb: string
  cover: string | null
  products_count: number
}

export type Spec = {
  label: string
  value: string
}

export type Product = {
  id: number
  name: string
  slug: string
  summary: string
  description: string
  price: number
  compare_at_price: number | null
  stock: number
  featured: boolean
  image: string
  accent: string
  specs: Spec[]
  category: {
    name: string
    slug: string
  }
}

export type CartLine = {
  product: Product
  quantity: number
}

export type User = {
  id: number
  name: string
  email: string
}

export type OrderItem = {
  id: number
  product_id: number
  name: string
  price: number
  quantity: number
  image: string
}

export type Order = {
  id: number
  reference: string
  email: string
  name: string
  phone: string | null
  address_line: string
  city: string
  postal_code: string
  country: string
  notes: string | null
  status: string
  subtotal: number
  shipping: number
  total: number
  items: OrderItem[]
  created_at: string
}

export type CheckoutPayload = {
  email: string
  name: string
  phone?: string
  address_line: string
  city: string
  postal_code: string
  country: string
  notes?: string
  items: { product_id: number; quantity: number }[]
}
