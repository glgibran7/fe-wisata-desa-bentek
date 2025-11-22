import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, ExternalLink } from "lucide-react";
import Api from "../utils/Api.jsx";

// --------------------------------------------
// CARD UNTUK BLOG
// --------------------------------------------
const PostCard = ({ post, index }) => {
  // Kalau nanti kamu mau kategorikan platform, bisa pakai field lain.
  // Default: tampilkan icon Instagram saja
  const PlatformIcon = Instagram;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col group"
    >
      {/* Gambar */}
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img
          src={
            post.image_url ||
            "https://placehold.co/600x400/94a3b8/ffffff?text=No+Image"
          }
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x400/94a3b8/ffffff?text=Image+Not+Found";
          }}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Konten */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <PlatformIcon className="w-4 h-4 text-pink-600" />
            <span className="text-pink-600 font-bold">Blog Desa</span>
          </div>

          <span className="text-xs text-gray-500">
            {new Date(post.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <h3 className="font-bold text-lg text-gray-800 mb-2">{post.title}</h3>

        <p className="text-gray-700 leading-relaxed mb-4 line-clamp-4 flex-grow">
          {post.content}
        </p>

        <a
          href={`/blog/${post.id_blog}`}
          className="mt-auto inline-flex items-center justify-center gap-2 text-sm font-semibold text-green-700 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-lg transition-all border border-green-200"
        >
          Baca Selengkapnya
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

// --------------------------------------------
// HALAMAN NEWSFEED
// --------------------------------------------
export default function NewsFeed() {
  const [blogs, setBlogs] = useState([]);

  // FETCH BLOG
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await Api.get("/blog");
        setBlogs(res.data);
      } catch (err) {
        console.error("Gagal mengambil data blog:", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section id="blog" className="py-20 bg-[#fcf2e8] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
            Berita Terbaru Desa Bentek
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Informasi terbaru dan kegiatan dari Desa Bentek.
          </p>
        </motion.div>

        {/* Grid Data Dari API */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.length === 0 ? (
            <p className="text-center col-span-3 text-gray-600">
              Belum ada postingan blog.
            </p>
          ) : (
            blogs.map((post, index) => (
              <PostCard key={post.id_blog} post={post} index={index} />
            ))
          )}
        </div>

        {/* Tombol ke Instagram */}
        <div className="text-center mt-16">
          <motion.a
            href="https://instagram.com/desabentek"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#c97b2f] text-white font-semibold rounded-full shadow-lg hover:bg-[#a86323] transition-all"
          >
            Kunjungi Instagram Desa
            <Instagram className="text-xl" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
