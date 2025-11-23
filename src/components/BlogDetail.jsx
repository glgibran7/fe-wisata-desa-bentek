import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Api from "../utils/Api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await Api.get(`/blog/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Gagal mengambil detail:", err);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="pt-24 p-10 text-center text-gray-600">Memuat...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="pt-24 pb-10 px-5 max-w-4xl mx-auto">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Kembali
        </button>

        <h1 className="text-3xl font-bold mb-3 capitalize">{post.title}</h1>

        <p className="text-gray-500 text-sm mb-5">
          {new Date(post.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full rounded-xl mb-6"
          />
        )}

        <p className="text-gray-800 whitespace-pre-line leading-relaxed text-justify">
          {post.content}
        </p>

        {post.post_url && (
          <a
            href={post.post_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-blue-600 underline text-sm font-medium"
          >
            Buka Postingan Asli
          </a>
        )}
      </section>

      <Footer />
    </>
  );
}
