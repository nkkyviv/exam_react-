import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://developerapis.vercel.app/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch blog posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) return <p>Loading blog posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Blog</h1>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "20px" }}>
          <img
            src={post.thumbnail || "/placeholder.png"}
            alt={post.title}
            width={200}
          />
          <h2>{post.title}</h2>
          <p>{post.content.slice(0, 150)}...</p>
          <Link to={`/blog/${post.id}`}>Read more →</Link>
        </div>
      ))}
    </div>
  );
}