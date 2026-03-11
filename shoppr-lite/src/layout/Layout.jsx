import { Outlet, Link } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/blog">Blog</Link>
            </nav>

            <main>
                <Outlet/>
            </main>

            <footer>
                <p>&copy; 2024 Shoppr. All rights reserved.</p>
            </footer>
        
        </div>
    )
}