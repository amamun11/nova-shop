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
      setError(err instanceof ApiError ? err.message : 'অর্ডার দেওয়া যায়নি। আবার চেষ্টা করুন।')
    } finally {
      setPending(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="page narrow">
        <h1>ব্যাগে কোনো পণ্য নেই।</h1>
        <Link className="btn" to="/shop">
          শপিংয়ে ফিরুন
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">চেকআউট</p>
        <h1>ডেলিভারির তথ্য দিন</h1>
      </header>
      <div className="split">
        <form className="form" onSubmit={submit}>
          {error && <p className="banner">{error}</p>}
          <label>
            পূর্ণ নাম
            <input name="name" required defaultValue={user?.name ?? ''} />
          </label>
          <label>
            ইমেইল
            <input name="email" type="email" required defaultValue={user?.email ?? ''} />
          </label>
          <label>
            মোবাইল নম্বর
            <input name="phone" placeholder="01XXXXXXXXX" />
          </label>
          <label>
            ঠিকানা
            <input name="address_line" required placeholder="বাড়ি নং, রাস্তা, এলাকা" />
          </label>
          <div className="form-row">
            <label>
              শহর / জেলা
              <input name="city" required placeholder="ঢাকা" />
            </label>
            <label>
              পোস্টাল কোড
              <input name="postal_code" required placeholder="1200" />
            </label>
          </div>
          <label>
            দেশ
            <input name="country" required defaultValue="Bangladesh" />
          </label>
          <label>
            বিশেষ নির্দেশনা
            <textarea name="notes" rows={3} placeholder="ডেলিভারি সংক্রান্ত যেকোনো তথ্য (ঐচ্ছিক)" />
          </label>
          <button className="btn" type="submit" disabled={pending}>
            {pending ? 'অর্ডার দেওয়া হচ্ছে…' : `অর্ডার করুন · ${money(subtotal + shipping)}`}
          </button>
          <p className="muted">এটি একটি ডেমো চেকআউট। কোনো পেমেন্ট নেওয়া হবে না।</p>
        </form>
        <aside className="summary">
          <h2>আপনার অর্ডার</h2>
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
            <span>ডেলিভারি চার্জ</span>
            <span>{shipping === 0 ? 'বিনামূল্যে' : money(shipping)}</span>
          </p>
          <p className="total">
            <span>মোট</span>
            <span>{money(subtotal + shipping)}</span>
          </p>
        </aside>
      </div>
    </div>
  )
}
