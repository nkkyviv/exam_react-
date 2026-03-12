import { useCart } from "../context/CartContext";

export default function CartPage() {

  const { cartItems, removeItem, updateQty, clearCart } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const remaining = 100 - subtotal; 
  
  return (
    <div>

      <h1>Your Cart</h1>

      {cartItems.length === 0 && <p>Cart is empty</p>}

      {cartItems.map((item, index) => (
        <div key={index}>

          <img
            src={`https://developerapis.vercel.app${item.image}`}
            width="80"
          />

          <p>{item.name}</p>
          <p>Colour: {item.color}</p>
          <p>Size: {item.size}</p>
          <p>${item.price}</p>

          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={(e) =>
              updateQty(index, Number(e.target.value))
            }
          />

          <button onClick={() => removeItem(index)}>
            Remove
          </button>

        </div>
      ))}

      <hr />

      {remaining > 0 ? (
        <p>Spend ${remaining.toFixed(2)} more for free shipping!</p>
      ) : (
        <p>You qualify for free shipping!</p>
      )}

      <h2>Order Summary</h2>

      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Shipping: ${shipping.toFixed(2)}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <h3>Total: ${total.toFixed(2)}</h3>

      <button
        onClick={() => {
          if (confirm("Clear cart?")) clearCart();
        }}
      >
        Clear Cart
      </button>

    </div>
  );
}