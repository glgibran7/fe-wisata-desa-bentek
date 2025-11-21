import React from "react";
import { motion } from "framer-motion";
// Mengganti react-icons/fa dan react-icons/fi dengan lucide-react untuk kompatibilitas lingkungan
import { Facebook, Instagram, ExternalLink } from "lucide-react";

// --- Data Dummy Simulasi Postingan Sosial Media ---
// Menghapus properti 'icon' karena sekarang ikon ditentukan secara dinamis di PostCard
const dummyPosts = [
  {
    id: 1,
    platform: "Instagram",
    date: "10 November 2025",
    caption:
      "Senja di Tiu Demper tak pernah gagal memukau! Siapa yang sudah berkunjung ke air terjun tersembunyi ini? Share pengalamanmu di komen! #DesaBentek #TiuDemper #AirTerjunLombok",
    image:
      "https://placehold.co/400x400/80e0e0/ffffff?text=Instagram+Tiu+Demper", // Placeholder image
    link: "https://instagram.com/p/dummy1",
  },
  {
    id: 2,
    platform: "Facebook",
    date: "8 November 2025",
    caption:
      "Pengumuman: Festival Budaya Lokal Desa Bentek akan hadir minggu depan! Mari saksikan tarian tradisional dan kuliner khas kami. Cek jadwal lengkap di bio! 🎭 #FestivalBentek #BudayaLombok",
    image:
      "https://placehold.co/800x450/e8a090/ffffff?text=Facebook+Event+Budaya", // Placeholder image
    link: "https://facebook.com/post/dummy2",
  },
  {
    id: 3,
    platform: "Instagram",
    date: "5 November 2025",
    caption:
      "Agrowisata Kakao Desa Bentek. Belajar membuat cokelat dari biji sampai siap santap. Cocok untuk liburan edukatif keluarga! 🍫🌱 Booking paket agro kami sekarang! #Agrowisata #KakaoBentek",
    image:
      "https://placehold.co/400x500/a0c0e8/ffffff?text=Instagram+Kakao+Farm", // Placeholder image
    link: "https://instagram.com/p/dummy3",
  },
  {
    id: 4,
    platform: "Facebook",
    date: "1 November 2025",
    caption:
      "Spot terbaru! Villa Bintang menawarkan pemandangan sunset terbaik di Bentek. Cocok untuk *healing* dan foto-foto estetik. Jangan lupa bawa kamera terbaikmu! 📸 #VillaBintang #SunsetLombok",
    image:
      "https://placehold.co/600x600/c0d0a0/ffffff?text=Facebook+Villa+Bintang", // Placeholder image
    link: "https://facebook.com/post/dummy4",
  },
];

// Komponen Card Postingan
const PostCard = ({ post, index }) => {
  const isInstagram = post.platform === "Instagram";
  // Menentukan ikon Lucide berdasarkan platform
  const PlatformIcon = isInstagram ? Instagram : Facebook;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col group"
    >
      {/* Gambar Postingan */}
      <div
        className={`w-full overflow-hidden ${
          isInstagram ? "aspect-[4/3] md:aspect-[5/4]" : "aspect-[16/9]"
        }`}
      >
        <img
          src={post.image}
          alt={`Post from ${post.platform}`}
          // Menambahkan penanganan error gambar placeholder
          onError={(e) => {
            e.target.onerror = null; // Mencegah loop
            e.target.src =
              "https://placehold.co/600x400/94a3b8/ffffff?text=Image+Not+Found";
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Konten Teks */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Header Platform */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            {/* Ikon Lucide yang telah ditentukan */}
            <PlatformIcon
              className={`w-4 h-4 ${
                isInstagram ? "text-pink-600" : "text-blue-600"
              }`}
            />
            <span
              className={`font-bold ${
                isInstagram ? "text-pink-600" : "text-blue-600"
              }`}
            >
              {post.platform}
            </span>
          </div>
          <span className="text-xs text-gray-500">{post.date}</span>
        </div>

        {/* Caption */}
        <p className="text-gray-700 leading-relaxed mb-4 line-clamp-4 flex-grow">
          {post.caption}
        </p>

        {/* Tombol Aksi */}
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 text-sm font-semibold text-green-700 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-lg transition-all border border-green-200"
        >
          Lihat Postingan Asli
          <ExternalLink className="w-4 h-4" /> {/* Ikon ExternalLink Lucide */}
        </a>
      </div>
    </motion.div>
  );
};

export default function NewsFeed() {
  return (
    <section id="blog" className="py-20 bg-[#fcf2e8] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
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
            Ikuti aktivitas dan pembaruan kami langsung dari media sosial.
          </p>
        </motion.div>

        {/* Grid Postingan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {dummyPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* Placeholder untuk tombol load lebih banyak / link ke sosial media */}
        <div className="text-center mt-16">
          <motion.a
            href="https://instagram.com/desabentek" // Ganti dengan link Instagram / Facebook resmi
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#c97b2f] text-white font-semibold rounded-full shadow-lg hover:bg-[#a86323] transition-all"
          >
            Lihat Semua Postingan di Instagram
            <Instagram className="text-xl" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
