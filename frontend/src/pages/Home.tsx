import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { ProductCard } from '../components/ProductCard'
import type { Category, Product } from '../types'

export function Home() {
  const [categories, setCategories] = useState<Category[]>([])
  const [featured, setFeatured] = useState<Product[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([api.categories(), api.products({ featured: true })])
      .then(([nextCategories, nextFeatured]) => {
        setCategories(nextCategories)
        setFeatured(nextFeatured)
      })
      .catch((err: Error) => setError(err.message))
  }, [])

  const spotlight = featured[0]

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">The autumn edit</p>
          <h1>Objects for a quieter room.</h1>
          <p className="lede">
            A small collection of seating, light, and objects chosen for the way they settle into a home.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/shop">
              Shop the edit
            </Link>
            <Link className="btn btn-ghost" to="/shop?category=seating">
              View seating
            </Link>
          </div>
        </div>
        <Link to={spotlight ? `/product/${spotlight.slug}` : '/shop'} className="hero-visual">
          {spotlight ? (
            <img src={spotlight.image} alt={spotlight.name} />
          ) : (
            <div className="hero-fallback" />
          )}
          <span className="hero-caption">
            <em>{spotlight?.name ?? 'Now in the showroom'}</em>
            <small>{spotlight?.summary ?? 'Furniture and objects, in stock.'}</small>
          </span>
        </Link>
      </section>

      {error && <p className="banner">{error}</p>}

      <section className="section">
        <div className="section-head">
          <h2>Departments</h2>
          <Link to="/shop">Shop all</Link>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link key={category.id} to={`/shop?category=${category.slug}`} className="category-tile">
              {category.cover && <img src={category.cover} alt="" />}
              <span>
                <strong>{category.name}</strong>
                <small>{category.blurb}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>In the room</h2>
          <Link to="/shop">See everything</Link>
        </div>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="band">
        <p>Made to be lived with, not just looked at.</p>
        <span>Complimentary shipping on orders over $250.</span>
      </section>

      <section className="story">
        <div>
          <p className="eyebrow">The studio</p>
          <h2>A shop with a short list.</h2>
          <p>
            NOVA keeps the assortment small on purpose. Every piece is something we would put in the showroom:
            solid frames, warm metals, cloth that softens with use.
          </p>
        </div>
        <div className="story-panel">
          <p>Lisbon showroom</p>
          <strong>14 Atelier Lane</strong>
          <span>Open Tuesday to Saturday, 11 to 6.</span>
        </div>
      </section>
    </>
  )
}
