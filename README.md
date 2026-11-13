# NOVA Shop

An artisanal furniture and interior objects e-commerce platform built with **Laravel 13** and **React 19 + TypeScript + Vite**.

---

## 🌐 Live Demo Link (Cloudflare Tunnel)

> **Public Demo URL**: https://dramatic-connections-remain-donated.trycloudflare.com

- **Test Customer Email**: `sara@example.com`
- **Password**: `password123`

## Architecture Overview

- **Frontend (`/frontend`)**:
  - React 19, TypeScript, Vite, React Router v7
  - Shopping cart with persistent state in `localStorage`
  - Client-side authentication state using Bearer tokens (Sanctum)
  - Category filters, live search, sort by price/newest/featured
  - Interactive product detail view with specifications, availability, and quantity controls
  - One-page checkout flow with automatic free shipping threshold calculation ($250+)
  - Order confirmation page and authenticated user order history

- **Backend (`/backend`)**:
  - Laravel 13 running on PHP 8.5
  - SQLite database (`database/database.sqlite`)
  - Laravel Sanctum for API token authentication
  - Database transactions with pessimistic row locking (`lockForUpdate`) for inventory stock management
  - Eloquent API Resources with unwrapped root payloads
  - Comprehensive feature test suite with 100% test coverage for API endpoints

---

## Quick Start

### 1. Backend Setup

```bash
cd backend
php artisan migrate --seed
php artisan serve --port=8000
```

The API will be available at `http://127.0.0.1:8000`.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Pre-seeded Accounts & Data

- **Test User**:
  - **Email**: `sara@example.com`
  - **Password**: `password123`
- **Seeded Categories**: Seating, Lighting, Tables, Textiles, Objects
- **Curated Pieces**: 11 curated furniture and decorative items with high-resolution imagery and specifications.

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/categories` | List categories with product counts | Public |
| `GET` | `/api/products` | Filter, search, and sort products | Public |
| `GET` | `/api/products/{slug}` | View product details by slug | Public |
| `POST` | `/api/register` | Register a new customer | Public |
| `POST` | `/api/login` | Sign in customer & return Bearer token | Public |
| `POST` | `/api/orders` | Place an order (guest or authenticated) | Public / Optional |
| `GET` | `/api/orders/{reference}`| View order details by reference code | Public |
| `GET` | `/api/user` | Fetch current authenticated user | `auth:sanctum` |
| `POST` | `/api/logout` | Revoke current user token | `auth:sanctum` |
| `GET` | `/api/orders` | List orders for current customer | `auth:sanctum` |

---

## Running Backend Tests

```bash
cd backend
php artisan test
```

