import { motion } from "framer-motion";
import { CiLocationOn } from "react-icons/ci";

const travelPackages = [
  {
    name: "Paket Eksplor Alam",
    desc: "Nikmati keindahan alam Desa Bentek dengan pemandangan menakjubkan dan udara sejuk.",
    spots: [
      {
        title: "Agrowisata",
        image: "/images/agrowisata.jpg",
      },
      {
        title: "Air Terjun Tiu Demper",
        image: "/images/tiu_demper.jpg",
      },
    ],
  },
  {
    name: "Paket Religi & Budaya",
    desc: "Jelajahi sisi spiritual dan budaya lokal yang kaya di Desa Bentek.",
    spots: [
      {
        title: "Wisata Religi",
        image: "/images/religi.jpg",
      },
      {
        title: "Sentra Kerajinan Bambu",
        image: "/images/kerajinan_bambu.jpg",
      },
    ],
  },
  {
    name: "Paket Petualangan Desa",
    desc: "Rasakan petualangan seru dengan menjelajahi spot-spot unggulan pilihan kami.",
    spots: [
      {
        title: "Perkebunan Kopi",
        image: "/images/perkebunan_kopi.jpg",
      },
      {
        title: "Bukit Panorama",
        image: "/images/bukit_panorama.jpg",
      },
      {
        title: "Air Terjun Mini",
        image: "/images/airterjun_mini.jpg",
      },
    ],
  },
];

export default function TravelPackages() {
  return (
    <section
      id="packages"
      className="py-14 bg-[#fcf2e8] text-center px-4 sm:px-6 lg:px-8"
    >
      {/* Judul Section */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-gray-800 mb-3"
      >
        Paket Perjalanan Wisata
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 mb-10 max-w-2xl mx-auto"
      >
        Pilih paket perjalanan sesuai minatmu dan jelajahi berbagai spot menarik
        di Desa Bentek.
      </motion.p>

      {/* Grid Paket */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {travelPackages.map((pkg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {pkg.name}
              </h3>
              <p className="text-gray-600 mb-4">{pkg.desc}</p>

              {/* Daftar Spot */}
              <div className="space-y-3">
                {pkg.spots.map((spot, sidx) => (
                  <motion.div
                    key={sidx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: sidx * 0.1 }}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-2 hover:bg-gray-100 transition"
                  >
                    <img
                      src={spot.image}
                      alt={spot.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex items-center gap-2 text-gray-700">
                      <CiLocationOn className="text-red-600 text-lg" />
                      <span className="font-medium">{spot.title}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
