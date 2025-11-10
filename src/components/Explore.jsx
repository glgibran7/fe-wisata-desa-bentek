import { motion } from "framer-motion";
import { FiZap, FiSmartphone, FiShield } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import coba from "../assets/images/tes.jpg";

// Menambahkan gambar ke dalam objek fitur
const explore = [
  {
    icon: <CiLocationOn className="w-10 h-10 text-red-600" />,
    title: "Agrowisata Pohon Bakau",
    desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: coba,
  },
  {
    icon: <CiLocationOn className="w-10 h-10 text-red-600" />,
    title: "Vilhara",
    desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: coba,
  },
  {
    icon: <CiLocationOn className="w-10 h-10 text-red-600" />,
    title: "Air Terjun Tiu Demper",
    desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: coba,
  },
  {
    icon: <CiLocationOn className="w-10 h-10 text-red-600" />,
    title: "Sentra Kerajinan Bambu",
    desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: coba,
  },
];

export default function Explore() {
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

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {explore.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition"
          >
            {/* Gambar Tempat Wisata */}
            <div className="mb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
