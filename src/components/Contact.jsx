import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaPaperPlane } from "react-icons/fa";
import { FiX } from "react-icons/fi";

export default function ContactSection() {
  const [showChat, setShowChat] = useState(false);
  const [input, setInput] = useState("");
  const phoneNumber = "6281234567890"; // ganti dengan nomor kamu

  const handleSend = () => {
    if (!input.trim()) return;
    const text = encodeURIComponent(input);
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
    setInput("");
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#fcf2e8] text-gray-800 overflow-hidden py-20 px-6 sm:px-10"
    >
      {/* 🌿 Tombol Floating WA */}
      <motion.button
        onClick={() => setShowChat((prev) => !prev)}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed bottom-8 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
      >
        <FaWhatsapp className="text-3xl" />
      </motion.button>

      {/* 💬 Floating Chat Box */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-20 right-6 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col z-50"
          >
            {/* Header */}
            <div className="bg-green-600 text-white px-4 py-3 flex justify-between items-center">
              <div>
                <p className="font-semibold">Chat Desa Bentek</p>
                <p className="text-xs text-green-100">Online sekarang</p>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-white/80 hover:text-white transition"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Pesan awal */}
            <div className="p-4 bg-gray-50 flex-1 flex flex-col justify-start">
              <div className="bg-white text-gray-800 p-3 rounded-xl shadow-sm text-sm w-fit">
                Halo! 👋 Ada yang bisa kami bantu?
              </div>
            </div>

            {/* Input area */}
            <div className="border-t border-gray-200 p-3 flex items-center gap-2 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Tulis pesan..."
                className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
              >
                <FaPaperPlane size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
