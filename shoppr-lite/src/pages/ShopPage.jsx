import useFetch from "../hooks/UseFetch";
import ProductCard from "../components/ProductCard";          

export default function ShopPage() {
  const { data, loading, error } = useFetch("https://developerapis.vercel.app/api/products");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Shop</h1>
      <div>
        {data.map(product => (
          <ProductCard key={product.id} product={product} />
        ))} 
      </div>
    </div>
  )
}