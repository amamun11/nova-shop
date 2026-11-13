import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api, money } from '../api'
import type { Order } from '../types'

export function OrderPage() {
  const { reference = '' } = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .order(reference)
      .then(setOrder)
      .catch((err: Error) => setError(err.message))
  }, [reference])

  if (error) {
    return (
      <div className="page narrow">
        <p className="banner">{error}</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="page narrow">
        <p className="muted">Finding your order…</p>
      </div>
    )
  }

  return (
    <div className="page narrow">
      <p className="eyebrow">Order {order.reference}</p>
      <h1>It’s reserved.</h1>
      <p className="lede">
        A note is on its way to {order.email}. We’ll pack {order.name.split(' ')[0]}’s order for {order.city}.
      </p>
      <ul className="lines lines-flat">
        {order.items.map((item) => (
          <li key={item.id}>
            <div className="line-media">
              <img src={item.image} alt="" />
            </div>
            <div>
              <h3>{item.name}</h3>
              <p className="muted">Qty {item.quantity}</p>
              <p className="price">{money(item.price * item.quantity)}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="total">
        <span>Total</span>
        <span>{money(order.total)}</span>
      </p>
      <p className="muted">
        {order.address_line}, {order.city} {order.postal_code}, {order.country}
      </p>
      <Link className="btn" to="/shop">
        Keep browsing
      </Link>
    </div>
  )
}
