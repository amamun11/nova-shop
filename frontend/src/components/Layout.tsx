import { FormEvent, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export function Layout() {
  const { count } = useCart()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function search(event: FormEvent) {
    event.preventDefault()
    const term = query.trim()
    navigate(term ? `/shop?q=${encodeURIComponent(term)}` : '/shop')
    setOpen(false)
  }

  return (
    <div className="shell">
      <header className={scrolled ? 'header is-scrolled' : 'header'}>
        <button className="icon-btn menu-btn" type="button" aria-label="Open menu" onClick={() => setOpen(true)}>
          <span />
          <span />
        </button>
        <nav className="desk-nav">
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/shop?category=seating">Seating</NavLink>
          <NavLink to="/shop?category=lighting">Lighting</NavLink>
          <NavLink to="/shop?category=objects">Objects</NavLink>
        </nav>
        <Link to="/" className="logo" aria-label="NOVA home">
          NOVA
        </Link>
        <div className="header-tools">
          <form className="search" onSubmit={search}>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search objects"
              aria-label="Search objects"
            />
          </form>
          <Link to="/account" className="text-link">
            {user ? user.name.split(' ')[0] : 'Account'}
          </Link>
          <Link to="/cart" className="text-link cart-link">
            Bag
            <span>{count}</span>
          </Link>
        </div>
      </header>

      {open && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="drawer-top">
            <span className="logo">NOVA</span>
            <button className="text-link" type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <nav className="drawer-nav" onClick={() => setOpen(false)}>
            <NavLink to="/shop">Shop all</NavLink>
            <NavLink to="/shop?category=seating">Seating</NavLink>
            <NavLink to="/shop?category=lighting">Lighting</NavLink>
            <NavLink to="/shop?category=tables">Tables</NavLink>
            <NavLink to="/shop?category=textiles">Textiles</NavLink>
            <NavLink to="/shop?category=objects">Objects</NavLink>
            <NavLink to="/account">Account</NavLink>
            <NavLink to="/cart">Bag ({count})</NavLink>
          </nav>
          <form className="drawer-search" onSubmit={search}>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search objects"
              aria-label="Search objects"
            />
          </form>
        </div>
      )}

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div>
          <p className="logo">NOVA</p>
          <p className="muted">Furniture, light, and small objects made to stay in the room.</p>
        </div>
        <div className="footer-cols">
          <div>
            <p className="eyebrow">Visit</p>
            <p>14 Atelier Lane</p>
            <p>Lisbon</p>
          </div>
          <div>
            <p className="eyebrow">Hours</p>
            <p>Tue–Sat</p>
            <p>11–6</p>
          </div>
          <div>
            <p className="eyebrow">Shipping</p>
            <p>Complimentary over $250</p>
            <p>Otherwise $28</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
