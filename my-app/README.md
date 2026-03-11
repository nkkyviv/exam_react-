# Tecvinson Frontend Training, Cohort 2025

Shoppr: React Capstone Project
Table of Contents
1. Project Overview
2. User Stories
3. The API
4. API Endpoints
5. App Architecture
6. Routing Requirements
7. React Concepts to Apply
8. Design System
9. Tools & Libraries
10. Best Practices
11. Common Pitfalls
12. Resources
13. Suggested Build Order
14. Grading Structure
15. Submission Instructions

## 1. Project Overview
Shoppr Lite is a front-end e-commerce application. You are required to build it using React, consuming a live REST API for your data. The project is your opportunity to apply everything covered in Modules 15–17 in one cohesive, real-world context.

The app allows shoppers to browse products, view product detail, and manage a cart. It also has a blog section powered by a separate API endpoint. You are expected to design and structure the application yourself. The user stories below define what needs to work, not how to build it.

Live Demo
A reference implementation is deployed at:

https://ngshoppr.netlify.app

Use this to understand what the finished app should do and how it should behave. Do not copy the code; build your own version from scratch. Your implementation may look completely different. What matters is that it meets all the user stories.

Scope
There is no user authentication, no real payment processing, and no persistent cart. The cart resets when the page is refreshed. This is intentional. The goal is to demonstrate your React fundamentals,.

## 2. User Stories
These define what the finished application must do. Use them to guide your build and to verify your implementation is complete.

Browsing & Shopping
US-01 — As a shopper, I want to browse all available products so I can discover what the store sells.
US-02 — As a shopper, I want to filter products by category so I only see items relevant to me.
US-03 — As a shopper, I want to search for a product by name or description so I can quickly find what I'm looking for.
US-04 — As a shopper, I want to sort products by price (low to high, high to low) and by rating so I can compare options.
US-05 — As a shopper, I want my active filter and search term to be reflected in the URL so I can share or bookmark that view.
US-06 — As a shopper, I want to see a loading state while products are being fetched so the page doesn't appear broken.
US-07 — As a shopper, I want to see an error message if products fail to load so I know something went wrong.
US-08 — As a shopper, I want a helpful message when no products match my filters so I'm not staring at a blank page.
Product Detail
US-09 — As a shopper, I want to view a product's full details (name, price, description, rating, brand, stock level) so I can make an informed decision.
US-10 — As a shopper, I want to select a colour variant before selecting a size, so that size options always correspond to the colour I chose.
US-11 — As a shopper, I want to see how many units of the selected variant are in stock.
US-12 — As a shopper, I want to choose a quantity before adding to cart so I don't have to add the same item multiple times.
US-13 — As a shopper, I want to be warned if I try to add to cart without selecting a colour or size.
US-14 — As a shopper, I want to see related products from the same category so I can discover similar items.
Cart
US-15 — As a shopper, I want items added to my cart to appear immediately without a page reload.
US-16 — As a shopper, I want to see the product image, name, colour, size, and price for each cart item.
US-17 — As a shopper, I want to update the quantity of a cart item.
US-18 — As a shopper, I want to remove an individual item from my cart.
US-19 — As a shopper, I want to see a subtotal, shipping cost, and estimated tax in an order summary.
US-20 — As a shopper, I want to know how much more I need to spend to qualify for free shipping.
US-21 — As a shopper, I want to be asked to confirm before clearing my entire cart.
US-22 — As a shopper, I want to see a live cart item count in the navigation bar that updates instantly.
Blog
US-23 — As a visitor, I want to see a preview of the latest blog posts on the homepage so I can discover content.
US-24 — As a visitor, I want clicking a blog preview to take me to that post's full content.
Loading & Error States
US-25 — As a user, I want to see a loading indicator whenever a page is fetching data so the app never looks frozen or broken.
US-26 — As a user, I want to see a friendly 404 page if I navigate to a URL that doesn't exist, with a clear message and a link back to a working page.

## 3. The API
Base URL
https://developerapis.vercel.app/api
What kind of API is this?
This is a public fake REST API, also called a mock or seed API. It exists to give you realistic data to build against without needing a real backend. Before writing any code, you need to understand these characteristics:

The data is randomly generated
Product names like "Rustic Wooden Keyboard" or "Handcrafted Steel Chips" are computer-generated and meaningless. Do not rely on names being consistent or meaningful across endpoints.

Write operations do not persist
The API exposes POST, PUT, and DELETE endpoints. They will return a success response, but nothing is actually saved. Any data you write will not be there on the next request. This is why your cart must be managed entirely in local React state; you cannot rely on the API to store it.

No authentication required
All endpoints are fully open. Every request is a plain GET with no tokens, no headers, nothing to configure.

Image paths are relative, not absolute
The image field on a product object is a relative path, for example /assets/images/product-5.jpg. This is not a usable URL on its own. You are required to prefix it with the API's base domain before using it as an src attribute.

Prices are strings, not numbers
The price field comes back from the API as a string: "6362.75". If you attempt arithmetic on it without converting it first, JavaScript will concatenate strings instead of adding numbers. You must coerce price values to numbers before performing any calculation.

The server can be slow
This is a free-tier hosted server. Responses can take 1 to 3 seconds. You must always handle loading states; never assume data arrives instantly.

## 4. API Endpoints
You are required to use the following two endpoints. The others exist on the API but are not needed for this project (reasons are noted below).

GET /api/products
Returns an array of all products.

[
  {
    "id": "prod-101",
    "name": "Sleek Wooden Keyboard",
    "price": "6362.75",
    "category": "Electronics",
    "description": "...",
    "image": "/assets/images/product-5.jpg",
    "meta": {
      "brand": "Acme",
      "rating": 4.2,
      "total_stock": 14,
      "variants": [
        {
          "color": "Blue",
          "sizes": [
            { "size": "M",  "sku": "SKU-001", "stock": 3 },
            { "size": "L",  "sku": "SKU-002", "stock": 0 },
            { "size": "XL", "sku": "SKU-003", "stock": 7 }
          ]
        },
        {
          "color": "Red",
          "sizes": [
            { "size": "S", "sku": "SKU-004", "stock": 5 }
          ]
        }
      ]
    }
  }
]
Things to note: - price is a string. Coerce it to a number before arithmetic. - image is a relative path. Prefix it with https://developerapis.vercel.app. - meta and its nested fields may be absent. Always use optional chaining (?.). - meta.total_stock is the overall stock count. meta.variants[].sizes[].stock is the per-SKU count. Use the per-SKU value once a colour and size have been selected. - meta.rating is a number between 1 and 5

GET /api/products/:id
Returns a single product object (same shape as above, not wrapped in an array).

GET /api/blogs
Returns an array of blog posts.

[
  {
    "id": "blog-1",
    "title": "Amazing Blog Post 1",
    "author": "Simran",
    "publishedAt": "2025-09-24T02:17:42.540Z",
    "content": "This is the full content of blog post number 1...",
    "meta": {
      "views": 1180,
      "likes": 566,
      "tags": ["Tech", "Health"],
      "comments": [
        {
          "id": "c-1-1",
          "user": "Ravi",
          "text": "This is comment 1 on blog 1.",
          "likes": 2
        }
      ]
    },
    "thumbnail": "data:image/svg+xml;base64,..."
  }
]
Things to note: - thumbnail is an inline base64-encoded SVG. It is a valid src value but the images are plain coloured placeholders. You may replace them with your own images. - publishedAt is an ISO 8601 date string. Use new Date(post.publishedAt).toLocaleDateString() to display it. - meta.comments is an array of comments embedded directly on the blog object. There is no separate comments endpoint.

GET /api/blogs/:id
Returns a single blog post object (same shape as above).

Endpoints You Do Not Need
Endpoint	Reason not used
GET /api/reviews	The product field on a review is a loose word like "Shoes". It does not match any product ID, so there is no reliable way to join reviews to products.
GET /api/carts	Cart items from this endpoint carry no product ID, no image, and no variant data. There is no way to reconstruct a usable cart from this data. The cart must live in local React state.
GET /api/users	No user authentication is required in this project.

## 5. App Architecture
You are required to organise your code in layers. The exact folder names and file names are your decision, but each layer must have a clear, single responsibility.

Entry point: The file that mounts your React app (main.jsx or index.jsx). Your router and context providers are set up here. Nothing else goes here.

App.jsx: Defines your routes. This is the top-level component rendered inside your providers.

Context: Files that manage global shared state. You will need at minimum a cart context. Each context file should expose a custom hook so consumers don't need to import the context object directly.

Hooks: Any reusable logic that uses React hooks belongs here, separate from your components. If you find yourself copying the same useState/useEffect pattern into multiple components, it should be a custom hook.

Components: Reusable UI pieces not tied to any specific page. A component used in more than one place should not live inside a page file.

Pages: One component per route. Each page is responsible for fetching the data it needs, managing its own state, and composing smaller components into a view.

Utils: Pure helper functions and shared constants. If a function doesn't use hooks and doesn't return JSX, it belongs here.

## 6. Routing Requirements
You are required to use React Router v6, specifically BrowserRouter, Routes, and Route (the standard JSX-based v6 API).

Entry point setup
BrowserRouter must wrap your entire application in your entry point file, outside of App:

// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
Route structure
Your routes must be defined inside App.jsx using Routes and Route. You are required to use a nested route with a shared layout so that your navigation and footer persist across page changes without re-mounting:

// App.jsx
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="shop/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:id" element={<PostPage />} />
        <Route path="*"        element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
Routes in this app
URL	Component	Notes
/	HomePage	Index route (default child of Layout)
/shop	ShopPage	Accepts ?q= and ?cat= query params
/shop/:id	ProductPage	:id read via useParams
/cart	CartPage	Session-only cart
/blog	BlogPage	All posts with search
/blog/:id	PostPage	Single post, :id read via useParams
*	NotFoundPage	Catch-all for any unmatched URL
Your Layout component must render an <Outlet /> where the active page should appear:

// Layout.jsx (simplified)
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <nav>...</nav>
      <main>
        <Outlet />
      </main>
      <footer>...</footer>
    </div>
  )
}
Navigation
Use <Link> and <NavLink> for clickable navigation in JSX. Use useNavigate() for programmatic navigation triggered by events (e.g. a back button, or after a form action).

// Declarative
<Link to="/shop">Browse shop</Link>

// NavLink — applies active styling automatically
<NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}>
  Cart
</NavLink>

// Programmatic
const navigate = useNavigate()
navigate(-1)          // go back one step in history
navigate('/shop')     // navigate to a specific route
URL as state
Your ShopPage filter and search state must be stored in the URL as query parameters so that filtered views are shareable and bookmarkable. Use useSearchParams to read and write them.

404 Catch-all Route
You are required to handle URLs that don't match any defined route. Add a path="*" route as the last child of your layout route. React Router will render it for any URL that falls through all other routes.

<Route path="*" element={<NotFoundPage />} />
Inside your NotFoundPage, use useLocation to read the URL the user tried to visit and display it clearly so they understand what went wrong.

const location = useLocation()
// location.pathname === "/some/unknown/route"

## 7. React Concepts to Apply
The following is a revision summary of the concepts you are required to demonstrate in this project. You are expected to apply these, not just know them.

JSX & Components
Every piece of UI you build is a component: a JavaScript function that returns JSX. Components accept props, which is how a parent passes data down to a child. Data flows one direction: parent to child. If a child needs to trigger a change in a parent, the parent must pass a callback function as a prop.

Conditional Rendering
Render things only when the conditions are right. Two patterns you will use throughout this project:

// Short-circuit — renders when condition is truthy
{isLoading && <Spinner />}

// Ternary — renders one of two things
{loading ? <Skeleton /> : <ProductList />}
List Rendering
Use .map() to render a list of items from an array. Every item rendered in a list must have a unique, stable key prop. Never use the array index as a key when the list can be filtered, sorted, or reordered.

{products.map(product => (
  <ProductCard key={product.id} product={product} />
))}
useState
Adds a piece of local state to a component. The component re-renders whenever the state changes. Never mutate state directly; always use the setter function.

const [count, setCount] = useState(0)

// Update using a value
setCount(1)

// Update based on previous value (always prefer this for derived updates)
setCount(prev => prev + 1)
useEffect
Runs a side effect after the component renders. Fetching data, setting a document title, subscribing to events: these are all side effects. The dependency array controls when it re-runs.

useEffect(() => {
  // runs after render

  return () => {
    // cleanup — runs before the next effect, or when the component unmounts
  }
}, [dependency]) // re-runs when `dependency` changes
[] runs once after the first render only
[value] runs again whenever value changes
No array means it runs after every render (almost always wrong)
useRef
Returns a mutable object whose .current property persists across renders without causing re-renders when it changes. Two uses:

Accessing a DOM element directly:

const inputRef = useRef(null)

useEffect(() => {
  inputRef.current.focus()
}, [])

return <input ref={inputRef} />
Storing a value between renders without triggering a re-render:

const timerRef = useRef(null)
timerRef.current = setTimeout(...)
useContext
Lets any component read shared state without prop drilling. Consists of three steps:

// 1. Create
const CartContext = createContext(null)

// 2. Provide — wrap the part of the tree that needs access
<CartContext.Provider value={{ items, addItem }}>
  {children}
</CartContext.Provider>

// 3. Consume — anywhere inside the Provider
const { items, addItem } = useContext(CartContext)
Expose a custom hook from your context file to keep consumer imports clean:

export function useCart() {
  return useContext(CartContext)
}
useMemo
Caches the result of a computation and only recalculates it when one of its dependencies changes. Use it when a computation is expensive (filtering or sorting large arrays) or when referential stability matters.

const filtered = useMemo(() => {
  return products.filter(p => p.category === category)
}, [products, category])
Without this, the filter would re-run on every render, including those caused by unrelated state changes like a user hovering a button.

useCallback
Caches a function so the same reference is returned across renders, unless its dependencies change. Use it for functions passed as props or placed in a context value, where a new reference on every render would cause unnecessary child re-renders.

const addItem = useCallback((product, color, size, qty) => {
  setItems(prev => [...prev, { product, color, size, qty }])
}, []) // stable — no dependencies
Custom Hooks
A custom hook is a function whose name starts with use and that calls other hooks inside it. Extract logic into a custom hook whenever the same combination of hooks appears in more than one component.

// Instead of repeating this in every component that fetches data:
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
useEffect(() => { fetch(url).then(...) }, [url])

// Write it once as a custom hook:
const { data, loading, error } = useFetch(url)
Custom hooks follow the same rules as all hooks: call them only at the top level of a component or another hook, never inside loops or conditionals.

useParams
Reads dynamic segments from the current URL. Required on your product detail page and blog post page.

// Route: /shop/:id
// URL:   /shop/prod-101

const { id } = useParams()
// id === "prod-101"
useSearchParams
Reads and writes the query string portion of the URL. Required on your shop page so that filter state lives in the URL.

const [searchParams, setSearchParams] = useSearchParams()
const category = searchParams.get('cat') || 'All'

## 8. Design System
The reference app is built around a specific colour palette. You are not required to use these exact colours. You are free to design your app however you like. This section documents the palette used in the demo so you have a reference if you want to match it closely or draw inspiration from it.

Colour Palette
Primary (Gold)
Token	Value
--color-primary-50	#fefaf2
--color-primary-100	#fdf3dc
--color-primary-200	#f9e4b0
--color-primary-300	#f2d078
--color-primary-400	#D4AF70
--color-primary-500	#C9A96E
--color-primary-600	#B8944A
--color-primary-700	#96763A
--color-primary-800	#755B2D
--color-primary-900	#4A3A1C
Secondary (Near-black)
Token	Value
--color-secondary-50	#f5f5f5
--color-secondary-100	#e8e8e8
--color-secondary-200	#d1d1d1
--color-secondary-300	#a1a1a1
--color-secondary-400	#6b6b6b
--color-secondary-500	#4A4A4A
--color-secondary-600	#2e2e2e
--color-secondary-700	#1a1a1a
--color-secondary-800	#0F0F0F
--color-secondary-900	#0A0A0A
Tertiary (Warm cream)
Token	Value
--color-tertiary-50	#ffffff
--color-tertiary-100	#F8F6F3
--color-tertiary-200	#f0ece5
--color-tertiary-300	#e4ddd3
--color-tertiary-400	#cec4b7
--color-tertiary-500	#b5a898
Neutral (Gray scale)
Token	Value
--color-neutral-50	#f9fafb
--color-neutral-100	#f3f4f6
--color-neutral-200	#e5e7eb
--color-neutral-300	#d1d5db
--color-neutral-400	#9ca3af
--color-neutral-500	#6b7280
--color-neutral-600	#4b5563
--color-neutral-700	#374151
--color-neutral-800	#1f2937
--color-neutral-900	#111827
Error
Token	Value
--color-error-50	#fef2f2
--color-error-100	#fee2e2
--color-error-200	#fecaca
--color-error-300	#fca5a5
--color-error-400	#f87171
--color-error-500	#ef4444
--color-error-600	#dc2626
--color-error-700	#b91c1c
--color-error-800	#991b1b
--color-error-900	#7f1d1d
Warning
Token	Value
--color-warning-50	#fff7ed
--color-warning-100	#ffedd5
--color-warning-200	#fed7aa
--color-warning-300	#fdba74
--color-warning-400	#fb923c
--color-warning-500	#f97316
--color-warning-600	#ea580c
--color-warning-700	#c2410c
--color-warning-800	#9a3412
--color-warning-900	#7c2d12
Success
Token	Value
--color-success-50	#f0fdf4
--color-success-100	#dcfce7
--color-success-200	#bbf7d0
--color-success-300	#86efac
--color-success-400	#4ade80
--color-success-500	#22c55e
--color-success-600	#16a34a
--color-success-700	#15803d
--color-success-800	#166534
--color-success-900	#14532d
Rating
Token	Value
--color-rating-300	#fcd34d
--color-rating-400	#fbbf24
--color-rating-500	#f59e0b
--color-rating-600	#d97706
Using these colours in your app
However you choose to style your app, having a defined palette makes it visually consistent. Define your colours once (as CSS custom properties, a JS constants file, or inside your framework's config) and reference them throughout rather than scattering magic hex values everywhere.

/* Example — CSS custom properties */
:root {
  --color-brand-gold:  #C9A96E;
  --color-brand-black: #0A0A0A;
  --color-brand-cream: #F8F6F3;
}

.button-primary {
  background-color: var(--color-brand-gold);
  color: var(--color-brand-black);
}

## 9. Tools & Libraries
Required
Tool	Purpose
React 18+	UI framework
React Router DOM v6	Client-side routing
Vite	Build tool and development server
Recommended
Tool	Purpose
lucide-react	Icon library with clean, consistent icons as React components
Styling
You are free to style your application however you choose. Options include plain CSS, CSS Modules, Tailwind CSS, styled-components, or any other approach you are comfortable with. What matters is that your app is usable and visually coherent, not which tool you used to get there.

HTTP
You do not need an external HTTP library. Use the native browser fetch API. It is good to understand fetch directly before reaching for abstractions like axios.

Development Tools
Tool	Why it matters
React DevTools (browser extension)	Inspect your component tree, see the current value of props, state, and context in real time. Essential for debugging.
Network tab (browser DevTools)	Watch your API calls: see the request URL, response data, status code, and timing.
ESLint	Catches common React mistakes: missing keys, missing dependencies in hooks, unused variables.

## 10. Best Practices
Always handle all three fetch states. Every component that fetches data must handle loading, error, and the success state. Never attempt to render data without first checking it isn't null.

if (loading) return <Skeleton />
if (error)   return <ErrorMessage />
return <Content data={data} />
Use optional chaining for nested API data. The API's nested objects (meta, meta.variants, etc.) may be absent. Use ?. to avoid runtime crashes.

product?.meta?.rating
product?.meta?.variants?.map(...)
Coerce types at the boundary. Convert price from string to number at the moment you receive it from the API, in the function that adds an item to the cart. Do not scatter Number() calls throughout your render code.

Never use array index as a key when your list can be filtered, sorted, or reordered. Use the item's unique ID from the API.

Never store derived state in useState. If a value can be computed from existing state, compute it. Do not store a copy of it in a separate state variable, as that creates two sources of truth that can go out of sync.

// Wrong — redundant state that can drift
const [total, setTotal] = useState(0)

// Correct — derive it
const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)
Clean up side effects. When a useEffect starts something ongoing (a fetch, a timer, an event listener), return a cleanup function. This prevents errors when a component unmounts before an async operation completes.

Keep components focused. If a component is doing many unrelated things and growing long, break it into smaller sub-components or extract logic into a custom hook.

Centralise magic strings. Your API base URL, category names, and other repeated constants should live in one place and be imported where needed, not typed inline repeatedly.

## 11. Common Pitfalls
Price arithmetic produces wrong results
Symptom: Cart total shows "100.00200.00" instead of 300.00.

Cause: product.price from the API is a string. The + operator on two strings concatenates them.

Fix: Coerce to a number when you first store it: price: Number(product.price).

Images are broken
Symptom: All product images show the broken image icon.

Cause: product.image is a relative path, not a full URL.

Fix: Prefix it: `https://developerapis.vercel.app${product.image}`

Always add an onError handler on <img> elements as a fallback.

Crash on first render before data arrives
Symptom: Cannot read properties of null (reading 'map').

Cause: data from your fetch starts as null. Calling data.map() immediately crashes.

Fix: Guard before rendering. Check for loading or check that data is not null before trying to use it.

Size options appear before a colour is selected
Symptom: The size selector renders immediately with options that may not correspond to any variant.

Cause: Sizes are being rendered unconditionally, or derived from all variants at once instead of from the selected colour's variant only.

Fix: Only render the size selector after a colour has been chosen, and derive the sizes list from the matching variant.

// Wrong — shows sizes before colour is chosen
{variants.flatMap(v => v.sizes).map(s => <option key={s.sku}>{s.size}</option>)}

// Correct — derive sizes from the selected colour only
const selectedVariant = variants.find(v => v.color === selectedColor)
{selectedColor && selectedVariant?.sizes.map(s => (
  <option key={s.sku} disabled={s.stock === 0}>{s.size}</option>
))}
Removing a cart item doesn't update the total
Symptom: An item is visually removed but the order summary still shows the old total.

Cause: State was mutated directly (.splice(), direct property assignment) instead of returning a new array. React didn't see a change and didn't re-render.

Fix: Always return a new array from your state setter:

setItems(prev => prev.filter(item => item.id !== id))
useEffect runs on every render / causes an infinite loop
Symptom: Your API is called hundreds of times, the browser tab becomes unresponsive.

Cause: Missing dependency array, or a new object/array being created on every render and placed in the dependency array.

Fix: Always provide a dependency array. If you only want the effect to run once on mount, use [].

## 12. Resources
Official Documentation
Resource	URL
React	https://react.dev
React Router v6	https://reactrouter.com/en/main
MDN Fetch API	https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
Tailwind CSS	https://tailwindcss.com/docs
Lucide Icons	https://lucide.dev/icons
Hooks Reference
Hook	Link
useState	https://react.dev/reference/react/useState
useEffect	https://react.dev/reference/react/useEffect
useContext	https://react.dev/reference/react/useContext
useRef	https://react.dev/reference/react/useRef
useMemo	https://react.dev/reference/react/useMemo
useCallback	https://react.dev/reference/react/useCallback
Essential Reading
Article	Why
"Thinking in React" (react.dev)	The canonical guide to breaking a UI into components and deciding where state lives
"You Might Not Need an Effect" (react.dev)	Explains the most common useEffect misuse patterns
"A Complete Guide to useEffect" (overreacted.io)	Deep-dive on how effects, cleanup, and dependencies actually work
Shoppr Lite Capstone

## 13. Suggested Build Order
Do not try to build the whole app at once. Work in vertical slices — get one feature fully working before moving to the next. This order is recommended because each step gives you something you can see and test before you add more complexity.

Estimated total time: 25–40 hours depending on your pace and how much you customise the UI.

Phase 1 — Scaffolding
Get a working shell before writing any real features.

Create your project with Vite: npm create vite@latest shoppr-lite -- --template react
Install React Router: npm install react-router-dom
Set up main.jsx with BrowserRouter wrapping App
Define all routes in App.jsx with placeholder page components (each just returns a heading for now)
Build your Layout component with a <nav>, <Outlet />, and a <footer>
Add navigation links and verify all routes render without crashing
Add your 404 catch-all route and NotFoundPage
Goal: Every route renders. Clicking nav links works. Visiting /nonsense shows your 404 page.

Phase 2 — Product Listing
Create a useFetch custom hook that handles loading, error, and data state
Fetch all products in ShopPage using your hook
Build a ProductCard component and render a grid of cards
Add category filter using useSearchParams — the selected category must appear in the URL (?cat=Electronics)
Add search using useSearchParams — the search term must also live in the URL (?q=keyboard)
Add sort controls (price low→high, high→low, rating)
Apply all three (filter, search, sort) together using useMemo
Handle the empty-results state with a helpful message
Goal: The shop page displays products, filter/search/sort all work, and the URL reflects the active state.

Phase 3 — Product Detail
Fetch a single product in ProductPage using useParams to get the ID
Display all product fields: name, price, description, rating, brand, stock
Build the colour selector — selecting a colour updates state
Build the size selector — only renders after a colour is chosen, derives options from the selected colour's variant
Add the quantity input — validate it against the per-SKU stock level
Add validation: warn the user if they try to add to cart without selecting colour or size
Fetch and display related products (same category, excluding the current product)
Goal: You can view a product, select a colour, then a size, and see the correct stock count for that variant.

Phase 4 — Cart
Create CartContext
Expose a useCart custom hook from the context file
Wrap your app in CartContext.Provider inside main.jsx
Wire the "Add to Cart" button on ProductPage to call addItem
Build CartPage — list each item with image, name, colour, size, price, quantity controls
Implement removeItem and updateQty in the cart page
Build the order summary: subtotal (derived, not stored in state), shipping, tax, total
Add the free-shipping progress indicator
Add the "Clear cart" button with a confirmation dialog
Display live cart item count in the navbar
Goal: You can add items, adjust quantities, remove items, and see totals update instantly.

Phase 5 — Blog & Polish
Fetch all blog posts in BlogPage and render previews
Link each preview to /blog/:id
Fetch and display a single post in PostPage
Add blog post previews to HomePage
Add loading skeletons or spinners to every page that fetches data
Review every user story against your implementation and check off each one
Goal: All 26 user stories pass. The app handles slow networks and failed fetches gracefully.

## 14. Grading Structure
Your submission will be graded across four areas. The breakdown below shows how marks are allocated and what distinguishes each level.

1. Functionality — 50 points
Each user story is worth 2 points. A story earns full marks if it works correctly in all expected scenarios (including edge cases like empty cart, no search results, or a network error). It earns 1 point if it partially works. It earns 0 if it is missing or broken.

User Story Group	Stories	Points
Browsing & Shopping	US-01 to US-08	15
Product Detail	US-09 to US-14	12
Cart	US-15 to US-22	15
Blog	US-23 to US-24	4
Loading & Error States	US-25 to US-26	4
Total		50*
2. Code Quality — 25 points
Criterion	Full marks	Partial	Zero
Architecture (5 pts)	Clear separation of pages, components, hooks, context, and utils. Each layer has a single responsibility.	Some mixing of concerns; logic in the wrong layer	No meaningful organisation; everything in one file
React patterns (5 pts)	Correct use of useState, useEffect, useContext, useMemo, useCallback, and custom hooks where appropriate	Mostly correct; minor misuse (e.g. missing cleanup, redundant state)	Significant misuse: state mutation, missing deps, no context
No derived state (5 pts)	Cart total, filtered products, and all other computable values are derived; not duplicated in useState	One or two redundant state variables	Multiple redundant state variables that go out of sync
Key props & list rendering (5 pts)	All lists use stable, unique keys from the API. No array indices used as keys on sortable/filterable lists	One or two index keys on non-static lists	Index keys used throughout
Type coercion at the boundary (5 pts)	price is coerced to a number in one place when it enters the cart. No scattered Number() calls.	Coerced correctly but in multiple places	Not coerced — arithmetic errors present
3. Robustness — 15 points
Criterion	Full marks	Partial	Zero
Fetch state handling (5 pts)	Every data-fetching component handles loading, error, and success. No render attempted before data exists.	Most covered; one or two missing	No loading/error handling anywhere
Optional chaining (5 pts)	?. used consistently for all nested API fields (meta, variants, sizes). No runtime crashes from missing fields.	Mostly present; occasional crash possible	Missing throughout
Edge cases (5 pts)	App handles: empty cart, zero stock, no search results, out-of-stock sizes (disabled), navigating to a non-existent product ID	Several edge cases handled	No edge case handling
4. UI & UX — 10 points
Criterion	Full marks	Partial	Zero
Visual coherence (5 pts)	Consistent colours, spacing, and typography throughout. Clearly intentional design, even if simple.	Some pages styled; others unstyled or inconsistent	No styling applied
Usability (5 pts)	Responsiveness, Navigation is clear. Actions have obvious feedback. Error and empty states are helpful, not confusing.	Mostly usable; one or two confusing interactions	Difficult to navigate or use
Total: 100 points
Grade	Score
Distinction	85–100
Merit	70–84
Pass	55–69
Needs resubmission	Below 55

## 15. Submission Instructions
What to submit
You must submit two things:

A GitHub repository containing your complete source code
A live deployed URL where the app can be used in a browser
Both are required. A repository without a deployed link, or a deployed link without a repository, will not be accepted.

GitHub repository requirements
The repository must be public so it can be reviewed
The root of the repository must contain your project files (not nested inside a subfolder)
Your README.md must include: your name, a one-line description of the project, and your deployed URL
Do not commit your node_modules folder. Your .gitignore (created automatically by Vite) already excludes it — do not remove that entry
Commit regularly throughout development. A single commit with all your code is a red flag. Your commit history should show your build process.
Deploying with Netlify (recommended)
Netlify is free and integrates directly with GitHub. Once connected, every push to your main branch redeploys automatically.

Push your project to GitHub
Go to netlify.com and sign up with your GitHub account
Click Add new site → Import an existing project → GitHub
Select your repository
Set the build command to npm run build and the publish directory to dist
Click Deploy site
Important — fix client-side routing on Netlify: React Router handles routing in the browser, but Netlify serves files from a CDN. When a user refreshes on /shop/prod-101, Netlify looks for a file at that path, finds nothing, and returns a 404. To fix this, create a file called _redirects in your public/ folder with this single line:

/*    /index.html    200
This tells Netlify to serve index.html for all paths and let React Router take over.

Submission
Submit your work with a document containing

Your full name
Your GitHub repository URL
Your deployed app URL
Deadline: The deadline for submission is Tow weeks from now, t 24th MArch, 2025.

