import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ApiError, api, money, shippingFor } from '../api'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export function Checkout() {
  const { items, subtotal, clear } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const shipping = shippingFor(subtotal)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setPending(true)
    setError('')
    try {
      const order = await api.checkout({
        name: String(form.get('name') || ''),
        email: String(form.get('email') || ''),
        phone: String(form.get('phone') || ''),
        address_line: String(form.get('address_line') || ''),
        city: String(form.get('city') || ''),
        postal_code: String(form.get('postal_code') || ''),
        country: String(form.get('country') || ''),
        notes: String(form.get('notes') || ''),
        items: items.map((line) => ({ product_id: line.product.id, quantity: line.quantity })),
      })
      clear()
      navigate(`/order/${order.reference}`)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not place the order.')
    } finally {
      setPending(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="page narrow">
        <h1>Nothing to check out.</h1>
        <Link className="btn" to="/shop">
          Return to the shop
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Checkout</p>
        <h1>Where should it go?</h1>
      </header>
      <div className="split">
        <form className="form" onSubmit={submit}>
          {error && <p className="banner">{error}</p>}
          <label>
            Full name
            <input name="name" required defaultValue={user?.name ?? ''} />
          </label>
          <label>
            Email
            <input name="email" type="email" required defaultValue={user?.email ?? ''} />
          </label>
          <label>
            Phone
            <input name="phone" />
          </label>
          <label>
            Address
            <input name="address_line" required placeholder="Street and number" />
          </label>
          <div className="form-row">
            <label>
              City
              <input name="city" required />
            </label>
            <label>
              Postal code
              <input name="postal_code" required />
            </label>
          </div>
          <label>
            Country
            <input name="country" required defaultValue="Portugal" />
          </label>
          <label>
            Notes for the studio
            <textarea name="notes" rows={3} placeholder="Delivery notes, optional" />
          </label>
          <button className="btn" type="submit" disabled={pending}>
            {pending ? 'Placing order…' : `Place order · ${money(subtotal + shipping)}`}
          </button>
          <p className="muted">This is a demonstration checkout. No payment is taken.</p>
        </form>
        <aside className="summary">
          <h2>Your order</h2>
          <ul className="mini-lines">
            {items.map((line) => (
              <li key={line.product.id}>
                <span>
                  {line.product.name} × {line.quantity}
                </span>
                <span>{money(line.product.price * line.quantity)}</span>
              </li>
            ))}
          </ul>
          <p>
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Complimentary' : money(shipping)}</span>
          </p>
          <p className="total">
            <span>Total</span>
            <span>{money(subtotal + shipping)}</span>
          </p>
        </aside>
      </div>
    </div>
  )
}
