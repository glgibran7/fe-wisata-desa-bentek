import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ayu Rahma",
    role: "Founder, Craftee",
    quote: "Wisata Desa Bentek memberikan pengalaman yang tak terlupakan.",
  },
  {
    name: "Rizky Pratama",
    role: "CEO, StartTech",
    quote:
      "Desa Bentek memadukan keindahan alam dan budaya lokal dengan sangat apik.",
  },
  {
    name: "Sinta Lestari",
    role: "Digital Marketer",
    quote: "Tiu Demper adalah surga tersembunyi yang wajib dikunjungi!",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 bg-[#fcf2e8] text-center px-4 sm:px-6 lg:px-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-extrabold text-gray-800 mb-12"
      >
        Apa Kata Mereka
      </motion.h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <p className="text-gray-700 italic mb-6">“{item.quote}”</p>
            <h4 className="font-bold text-gray-900">{item.name}</h4>
            <p className="text-sm text-gray-500">{item.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
