import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaGlobe } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full bg-[#fcf2e8] text-gray-800 overflow-hidden py-20 px-6 sm:px-10"
    >
      {/* Background soft glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-[-150px] w-[400px] h-[400px] bg-[#f6cfa5]/40 blur-3xl rounded-full" />
        <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-[#f4b680]/30 blur-3xl rounded-full" />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-14 lg:gap-20"
      >
        {/* 1️⃣ Tentang */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5">
            Tentang <span className="text-green-700">Desa Bentek</span>
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            Desa Wisata Bentek di Lombok Utara menawarkan keindahan alam,
            budaya, dan keramahan masyarakat. Kami mengembangkan pariwisata
            berkelanjutan untuk memberdayakan warga lokal dan menjaga
            kelestarian lingkungan.
          </p>

          {/* Social Links */}
          <div className="flex gap-5 mt-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-200/60 hover:bg-green-600 hover:text-white rounded-full transition"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-200/60 hover:bg-green-600 hover:text-white rounded-full transition"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://desabentek.id"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-200/60 hover:bg-green-600 hover:text-white rounded-full transition"
            >
              <FaGlobe size={18} />
            </a>
          </div>
        </div>

        {/* 2️⃣ Menu Navigasi */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-5">Navigasi</h3>
          <ul className="space-y-3 text-gray-700 text-base">
            <li>
              <a href="#home" className="hover:text-green-700 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#explore" className="hover:text-green-700 transition">
                Explore
              </a>
            </li>
            <li>
              <a href="#packages" className="hover:text-green-700 transition">
                Packages
              </a>
            </li>
          </ul>
        </div>

        {/* 3️⃣ Kontak */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-5">
            Hubungi Kami
          </h3>

          <div className="flex items-start gap-3 mb-4">
            <FiMapPin className="text-red-600 text-3xl mt-1" />
            <p className="text-gray-700 leading-relaxed text-base">
              Desa Bentek, Kec. Gangga, Kab. Lombok Utara, Nusa Tenggara Barat
            </p>
          </div>

          <div className="flex items-start gap-3 mb-4">
            <FiPhone className="text-green-600 text-xl mt-1" />
            <p className="text-gray-700 text-base">+62 812-3456-7890</p>
          </div>

          <div className="flex items-start gap-3">
            <FiMail className="text-red-600 text-xl mt-1" />
            <p className="text-gray-700 text-base">info@desabentek.id</p>
          </div>
        </div>
      </motion.div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed bottom-8 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
      >
        <FaWhatsapp className="text-3xl" />
      </motion.a>
    </section>
  );
}
