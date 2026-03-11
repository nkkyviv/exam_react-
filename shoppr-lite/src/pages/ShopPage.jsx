import useFetch from "../hooks/UseFetch";
import ProductCard from "../components/ProductCard"; 
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";


export default function ShopPage() {
  const { data, loading, error } = useFetch("https://developerapis.vercel.app/api/products");
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("cat") || "";
  const search = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "";

  // Memoize filtered products to avoid unnecessary computations on every render
  const filteredProducts = useMemo(() => {
    if (!data || !Array.isArray(data)) return []; // <-- safeguard

    let products = [...data];

    if (category) {
      products = products.filter((p) => p.category === category);
    }

    if (search) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "low") {
      products.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      products.sort((a, b) => b.price - a.price);
    }

    return products;
  }, [data, category, search, sort]);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Shop</h1>
      <div>
        {/* Category dropdown filter */}
        <select
          value={category}
          onChange={(e) =>
            setSearchParams({ cat: e.target.value })
          }
        >
          <option value="">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) =>
            setSearchParams({ q: e.target.value })
          }
        />

        {/* Sort Dropdown */}
        <select
          value={sort}
          onChange={(e) =>
            setSearchParams({ sort: e.target.value })
          }
        >
          <option value="">Default</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <p>No products found.</p>
        )}

        {/* Product Grid */}
        {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))} 
      </div>
    </div>
  )
}