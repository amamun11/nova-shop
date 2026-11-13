import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api'
import { ProductCard } from '../components/ProductCard'
import type { Category, Product } from '../types'

const sorts = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price, low to high' },
  { value: 'price_desc', label: 'Price, high to low' },
]

export function Shop() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') ?? ''
  const q = params.get('q') ?? ''
  const sort = params.get('sort') ?? 'featured'
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.categories().then(setCategories).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    setError('')
    api
      .products({ category: category || undefined, q: q || undefined, sort })
      .then(setProducts)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [category, q, sort])

  function update(next: Record<string, string>) {
    const merged = new URLSearchParams(params)
    Object.entries(next).forEach(([key, value]) => {
      if (value) merged.set(key, value)
      else merged.delete(key)
    })
    setParams(merged)
  }

  const active = categories.find((item) => item.slug === category)

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">{q ? 'Search' : 'The collection'}</p>
        <h1>{q ? `Results for “${q}”` : active?.name ?? 'Shop all'}</h1>
        <p className="lede">{active?.blurb ?? 'Seating, lighting, tables, textiles, and objects.'}</p>
      </header>

      <div className="shop-layout">
        <aside className="filters">
          <p className="eyebrow">Category</p>
          <button type="button" className={!category ? 'filter is-active' : 'filter'} onClick={() => update({ category: '' })}>
            All
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={category === item.slug ? 'filter is-active' : 'filter'}
              onClick={() => update({ category: item.slug })}
            >
              {item.name}
              <span>{item.products_count}</span>
            </button>
          ))}
        </aside>

        <div>
          <div className="shop-bar">
            <p className="muted">{loading ? 'Loading…' : `${products.length} pieces`}</p>
            <label>
              Sort
              <select value={sort} onChange={(event) => update({ sort: event.target.value })}>
                {sorts.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {error && <p className="banner">{error}</p>}
          {!loading && products.length === 0 && <p className="empty">Nothing matches this edit. Try another category.</p>}
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
