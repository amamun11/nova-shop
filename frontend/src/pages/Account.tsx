import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { ApiError } from '../api'
import { useAuth } from '../context/AuthContext'

export function Account() {
  const { user, ready, login, register, logout } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setPending(true)
    setError('')
    try {
      if (mode === 'login') {
        await login(String(form.get('email')), String(form.get('password')))
      } else {
        await register(
          String(form.get('name')),
          String(form.get('email')),
          String(form.get('password')),
          String(form.get('password_confirmation')),
        )
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not sign in.')
    } finally {
      setPending(false)
    }
  }

  if (!ready) return <div className="page narrow"><p className="muted">Loading account…</p></div>

  if (user) {
    return (
      <div className="page narrow">
        <p className="eyebrow">Account</p>
        <h1>Hello, {user.name.split(' ')[0]}.</h1>
        <p className="lede">{user.email}</p>
        <div className="hero-actions">
          <Link className="btn" to="/orders">
            Order history
          </Link>
          <button className="btn btn-ghost" type="button" onClick={() => logout()}>
            Sign out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page narrow">
      <p className="eyebrow">Account</p>
      <h1>{mode === 'login' ? 'Welcome back.' : 'Create an account.'}</h1>
      <div className="tabs">
        <button type="button" className={mode === 'login' ? 'is-active' : ''} onClick={() => setMode('login')}>
          Sign in
        </button>
        <button type="button" className={mode === 'register' ? 'is-active' : ''} onClick={() => setMode('register')}>
          Register
        </button>
      </div>
      <form className="form" onSubmit={submit}>
        {error && <p className="banner">{error}</p>}
        {mode === 'register' && (
          <label>
            Name
            <input name="name" required />
          </label>
        )}
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" required minLength={8} />
        </label>
        {mode === 'register' && (
          <label>
            Confirm password
            <input name="password_confirmation" type="password" required minLength={8} />
          </label>
        )}
        <button className="btn" type="submit" disabled={pending}>
          {pending ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
        </button>
      </form>
    </div>
  )
}
