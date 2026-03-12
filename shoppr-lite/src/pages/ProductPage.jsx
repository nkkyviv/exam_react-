import { useParams } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import { useState } from "react";

export default function ProductPage() {

  const { id } = useParams();

  const { data: product, loading, error } = useFetch(
    `https://developerapis.vercel.app/api/products/${id}`
  );

  const { data: allProducts } = useFetch(
    "https://developerapis.vercel.app/api/products"
  );

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error loading product</p>;
  if (!product) return <p>No product found</p>;

  const relatedProducts = allProducts?.filter((p) => p.category === product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4) || [];

  console.log(product);

  return (
    <div>

      <h1>{product.name}</h1>

      <img
        src={`https://developerapis.vercel.app${product.image}`}
        alt={product.name}
        width="300"
      />

      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <p>Brand: {product.meta.brand}</p>
      <p>Rating: {product.meta.rating}</p>

      {/* COLOUR SELECTOR */}
      {product.meta.variants && (
        <>
          <h3>Select Colour</h3>
          {product.meta.variants.map((variant) => (
            <button
              key={variant.color}
              onClick={() => {
                setSelectedColor(variant);
                setSelectedSize(null);
              }}
            >
              {variant.color}
            </button>
          ))}
        </>
      )}

      {/* SIZE SELECTOR */}
      {selectedColor && (
        <>
          <h3>Select Size</h3>
          {selectedColor.sizes?.map((size) => (
            <button key={size.size} onClick={() => setSelectedSize(size)}>
              {size.size}
            </button>
          ))}
        </>
      )}

      {/* STOCK + QUANTITY */}
      {selectedSize && (
        <>
          <p>Stock: {selectedSize.stock}</p>
          <input
            type="number"
            min="1"
            max={selectedSize.stock}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </>
      )}

      <button
        onClick={() => {
          if (!selectedColor) {
            alert("Please select a colour");
            return;
          }

          if (!selectedSize) {
            alert("Please select a size");
            return;
          }

          alert("Added to cart!");
        }}
      >
        Add To Cart
      </button>

    <h2>Related Products</h2>
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {relatedProducts.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            width: "150px",
            textAlign: "center",
          }}
        >
          <img
            src={`https://developerapis.vercel.app${item.image}`}
            alt={item.name}
            width="120"
          />
          <h4>{item.name}</h4>
          <p>{item.category}</p>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
    </div>
  );
}