import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, money } from '../api'
import { useAuth } from '../context/AuthContext'
import type { Order } from '../types'

export function Orders() {
  const { user, ready } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    api
      .orders()
      .then(setOrders)
      .catch((err: Error) => setError(err.message))
  }, [user])

  if (!ready) return <div className="page narrow"><p className="muted">Loading…</p></div>

  if (!user) {
    return (
      <div className="page narrow">
        <h1>Sign in to see orders.</h1>
        <Link className="btn" to="/account">
          Go to account
        </Link>
      </div>
    )
  }

  return (
    <div className="page narrow">
      <p className="eyebrow">Orders</p>
      <h1>Your history.</h1>
      {error && <p className="banner">{error}</p>}
      {orders.length === 0 && <p className="lede">No orders yet. The showroom is open.</p>}
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id}>
            <div>
              <strong>{order.reference}</strong>
              <p className="muted">
                {new Date(order.created_at).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
                {' · '}
                {order.status}
              </p>
            </div>
            <div className="order-side">
              <span>{money(order.total)}</span>
              <Link to={`/order/${order.reference}`}>View</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
