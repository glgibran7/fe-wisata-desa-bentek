import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiLocationOn } from "react-icons/ci";
import coba from "../assets/images/tes.jpg";
import tiudemper from "../assets/images/tiudemper.webp";
import vihara from "../assets/images/vihara.webp";
import kakao from "../assets/images/kakao.jpg";

const explore = [
  {
    icon: <CiLocationOn className="w-10 h-10 text-red-600" />,
    title: "Lokok Segara (Tiu Demper)",
    desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: tiudemper,
    link: "https://maps.app.goo.gl/2eRYVRg6VUdZWYNx5",
  },
  {
    icon: <CiLocationOn className="w-10 h-10 text-red-600" />,
    title: "Villa Bintang",
    desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: coba,
    link: "https://maps.app.goo.gl/ZLjFzArkuF9wKMTb6",
  },
  {
    icon: <CiLocationOn className="w-10 h-10 text-red-600" />,
    title: "Vihara Bodhi Dharma",
    desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: vihara,
    link: " https://maps.app.goo.gl/1Cke2pQ3sZYYWePq6",
  },
  {
    icon: <CiLocationOn className="w-10 h-10 text-red-600" />,
    title: "Sungai dan Sawah Desa Bentek",
    desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: coba,
    link: "https://goo.gl/maps/1m8NqG89cAq3AjtU6",
  },
  {
    icon: <CiLocationOn className="w-10 h-10 text-red-600" />,
    title: "Pembibitan Pohon Kakao (Agrowisata)",
    desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: kakao,
    link: "https://goo.gl/maps/1m8NqG89cAq3AjtU6",
  },
  {
    icon: <CiLocationOn className="w-10 h-10 text-red-600" />,
    title: "Sentra Kerajinan Bambu",
    desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: coba,
    link: "https://goo.gl/maps/YT2RpVtY2yGkFJhP7",
  },
];

export default function Explore() {
  const [showModal, setShowModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState("");

  const handleOpenMap = (link) => {
    setSelectedLink(link);
    setShowModal(true);
  };

  const confirmOpen = () => {
    window.open(selectedLink, "_blank");
    setShowModal(false);
  };

  return (
    <section
      id="explore"
      className="py-10 bg-[#fcf2e8] text-center px-4 sm:px-6 lg:px-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-extrabold text-gray-800"
      >
        The best place to find
      </motion.h2>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-extrabold text-gray-800 mb-10"
      >
        your <span className="font-normal italic">inner place</span>
      </motion.h2>

      {/* CARD GRID */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {explore.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            onClick={() => handleOpenMap(item.link)}
            className="p-6 bg-white rounded-2xl shadow hover:shadow-2xl hover:-translate-y-1 transition cursor-pointer border border-gray-100"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-xl mb-4 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="bg-white rounded-3xl p-8 w-80 shadow-2xl text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-30 rounded-3xl"></div>

              <h3 className="text-lg font-bold text-gray-800 relative z-10 mb-3">
                Buka Lokasi di Google Maps?
              </h3>
              <p className="text-sm text-gray-600 relative z-10 mb-6">
                Kamu akan diarahkan ke Google Maps untuk melihat lokasi wisata
                ini.
              </p>

              <div className="flex justify-center gap-3 relative z-10">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
                >
                  Batal
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmOpen}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 font-medium shadow-md transition"
                >
                  Buka
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
