import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="page narrow">
      <p className="eyebrow">404</p>
      <h1>That page has left the showroom.</h1>
      <Link className="btn" to="/">
        Back home
      </Link>
    </div>
  )
}
