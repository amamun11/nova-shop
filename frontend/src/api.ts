import type { Category, CheckoutPayload, Order, Product, User } from './types'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

const TOKEN_KEY = 'nova-token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  headers.set('Accept', 'application/json')
  if (options.body) headers.set('Content-Type', 'application/json')
  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(path, { ...options, headers })
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const fieldError =
      data.errors && typeof data.errors === 'object'
        ? Object.values(data.errors).flat()[0]
        : null
    const message = fieldError || data.message || 'Something went wrong.'
    throw new ApiError(String(message), response.status)
  }

  return data as T
}

export const api = {
  categories: () => request<Category[]>('/api/categories'),
  products: (params: { category?: string; q?: string; sort?: string; featured?: boolean } = {}) => {
    const query = new URLSearchParams()
    if (params.category) query.set('category', params.category)
    if (params.q) query.set('q', params.q)
    if (params.sort) query.set('sort', params.sort)
    if (params.featured) query.set('featured', '1')
    const suffix = query.toString() ? `?${query}` : ''
    return request<Product[]>(`/api/products${suffix}`)
  },
  product: (slug: string) => request<Product>(`/api/products/${slug}`),
  register: (body: { name: string; email: string; password: string; password_confirmation: string }) =>
    request<{ token: string; user: User }>('/api/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body: { email: string; password: string }) =>
    request<{ token: string; user: User }>('/api/login', { method: 'POST', body: JSON.stringify(body) }),
  logout: () => request<{ message: string }>('/api/logout', { method: 'POST' }),
  me: () => request<User>('/api/user'),
  checkout: (body: CheckoutPayload) => request<Order>('/api/orders', { method: 'POST', body: JSON.stringify(body) }),
  orders: () => request<Order[]>('/api/orders'),
  order: (reference: string) => request<Order>(`/api/orders/${reference}`),
}

export function money(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value)
}

export const FREE_SHIPPING_AT = 250
export const SHIPPING_FEE = 28

export function shippingFor(subtotal: number) {
  return subtotal >= FREE_SHIPPING_AT || subtotal === 0 ? 0 : SHIPPING_FEE
}
