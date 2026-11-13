import { Link } from 'react-router-dom'
import { money } from '../api'
import type { Product } from '../types'

export function ProductCard({ product }: { product: Product }) {
  const onSale = product.compare_at_price !== null && product.compare_at_price > product.price

  return (
    <article className="card">
      <Link to={`/product/${product.slug}`} className="card-media" style={{ background: product.accent }}>
        <img src={product.image} alt={product.name} />
        {onSale && <span className="badge">Sale</span>}
        {product.stock === 0 && <span className="badge badge-dark">Sold out</span>}
      </Link>
      <div className="card-meta">
        <p className="eyebrow">{product.category.name}</p>
        <h3>
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="price">
          {onSale && <s>{money(product.compare_at_price!)}</s>}
          <span>{money(product.price)}</span>
        </p>
      </div>
    </article>
  )
}
