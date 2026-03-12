import { Outlet, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Layout() {
    const { cartItems } = useCart();
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/cart">Cart({itemCount})</Link>
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