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
        <p className="eyebrow">ব্যাগ</p>
        <h1>আপনার ব্যাগ খালি।</h1>
        <p className="lede">এখনই কেনাকাটা শুরু করুন — সেরা পণ্যগুলো দ্রুত শেষ হয়ে যায়।</p>
        <Link className="btn" to="/shop">
          শপিং করুন
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">ব্যাগ</p>
        <h1>চলুন অর্ডার করি!</h1>
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
                    সরিয়ে দিন
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <aside className="summary">
          <h2>সারসংক্ষেপ</h2>
          <p>
            <span>সাবটোটাল</span>
            <span>{money(subtotal)}</span>
          </p>
          <p>
            <span>ডেলিভারি চার্জ</span>
            <span>{shipping === 0 ? 'বিনামূল্যে' : money(shipping)}</span>
          </p>
          <p className="total">
            <span>মোট</span>
            <span>{money(total)}</span>
          </p>
          <p className="muted">{subtotal >= 5000 ? 'বিনামূল্যে ডেলিভারি পেয়েছেন! 🎉' : `আরও ${money(5000 - subtotal)} কিনলে বিনামূল্যে ডেলিভারি পাবেন।`}</p>
          <Link className="btn" to="/checkout">
            চেকআউট করুন
          </Link>
        </aside>
      </div>
    </div>
  )
}
