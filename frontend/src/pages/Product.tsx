import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api, money } from '../api'
import { ProductCard } from '../components/ProductCard'
import { Qty } from '../components/Qty'
import { useCart } from '../context/CartContext'
import type { Product } from '../types'

export function ProductPage() {
  const { slug = '' } = useParams()
  const { add } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setAdded(false)
    setQuantity(1)
    setProduct(null)
    api
      .product(slug)
      .then((next) => {
        setProduct(next)
        return api.products({ category: next.category.slug })
      })
      .then((items) => setRelated(items.filter((item) => item.slug !== slug).slice(0, 3)))
      .catch((err: Error) => setError(err.message))
  }, [slug])

  if (error) {
    return (
      <div className="page">
        <p className="banner">{error}</p>
        <Link to="/shop">Back to the shop</Link>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="page">
        <p className="muted">Loading piece…</p>
      </div>
    )
  }

  const onSale = product.compare_at_price !== null && product.compare_at_price > product.price

  return (
    <div className="page">
      <p className="crumb">
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category.slug}`}>{product.category.name}</Link>
      </p>
      <div className="pdp">
        <div className="pdp-media" style={{ background: product.accent }}>
          <img src={product.image} alt={product.name} />
        </div>
        <div className="pdp-copy">
          <p className="eyebrow">{product.category.name}</p>
          <h1>{product.name}</h1>
          <p className="price price-lg">
            {onSale && <s>{money(product.compare_at_price!)}</s>}
            <span>{money(product.price)}</span>
          </p>
          <p className="lede">{product.summary}</p>
          <p>{product.description}</p>
          <dl className="specs">
            {product.specs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
            <div>
              <dt>Availability</dt>
              <dd>{product.stock > 0 ? `${product.stock} in the studio` : 'Sold out'}</dd>
            </div>
          </dl>
          {product.stock > 0 ? (
            <div className="buy-row">
              <Qty value={quantity} max={product.stock} onChange={setQuantity} />
              <button
                className="btn"
                type="button"
                onClick={() => {
                  add(product, quantity)
                  setAdded(true)
                }}
              >
                Add to bag
              </button>
            </div>
          ) : (
            <p className="banner">This piece is sold out.</p>
          )}
          {added && (
            <p className="note">
              Added to your bag. <Link to="/cart">View bag</Link>
            </p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>Alongside it</h2>
          </div>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
