import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(
          `https://developerapis.vercel.app/api/blogs/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>By {post.author} on {new Date(post.publishedAt).toLocaleDateString()}</p>
      <img
        src={post.thumbnail || "/placeholder.png"}
        alt={post.title}
        width={400}
      />
      <p>{post.content}</p>
    </div>
  );
}