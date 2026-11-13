import { Link } from 'react-router-dom'
import { money, shippingFor } from '../api'
import { Qty } from '../components/Qty'
import { useCart } from '../context/CartContext'

export function CartPage() {
  const { items, subtotal, setQuantity, remove } = useCart()
  const shipping = shippingFor(subtotal)
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="page narrow">
        <p className="eyebrow">Bag</p>
        <h1>Your bag is empty.</h1>
        <p className="lede">The collection is small, and the good pieces go quickly.</p>
        <Link className="btn" to="/shop">
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Bag</p>
        <h1>Ready when you are.</h1>
      </header>
      <div className="split">
        <ul className="lines">
          {items.map((line) => (
            <li key={line.product.id}>
              <Link to={`/product/${line.product.slug}`} className="line-media" style={{ background: line.product.accent }}>
                <img src={line.product.image} alt="" />
              </Link>
              <div>
                <p className="eyebrow">{line.product.category.name}</p>
                <h3>
                  <Link to={`/product/${line.product.slug}`}>{line.product.name}</Link>
                </h3>
                <p className="price">{money(line.product.price)}</p>
                <div className="line-actions">
                  <Qty
                    value={line.quantity}
                    max={line.product.stock}
                    onChange={(quantity) => setQuantity(line.product.id, quantity)}
                  />
                  <button type="button" className="text-link" onClick={() => remove(line.product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <aside className="summary">
          <h2>Summary</h2>
          <p>
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </p>
          <p>
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Complimentary' : money(shipping)}</span>
          </p>
          <p className="total">
            <span>Total</span>
            <span>{money(total)}</span>
          </p>
          <p className="muted">{subtotal >= 250 ? 'You’ve reached complimentary shipping.' : `Add ${money(250 - subtotal)} for complimentary shipping.`}</p>
          <Link className="btn" to="/checkout">
            Checkout
          </Link>
        </aside>
      </div>
    </div>
  )
}
