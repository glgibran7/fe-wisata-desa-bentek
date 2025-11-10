import { motion } from "framer-motion";
import { CiLocationOn } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";

const whatsappNumber = "6287861664764"; // nomor WhatsApp tujuan

const travelPackages = [
  {
    name: "Paket Eksplor Alam",
    desc: "Nikmati keindahan alam Desa Bentek dengan pemandangan menakjubkan dan udara sejuk.",
    spots: ["Agrowisata", "Air Terjun Tiu Demper"],
    price: "Rp150.000",
    benefits: [
      "Pemandu wisata lokal",
      "Air mineral & snack",
      "Tiket masuk lokasi wisata",
    ],
  },
  {
    name: "Paket Religi & Budaya",
    desc: "Jelajahi sisi spiritual dan budaya lokal yang kaya di Desa Bentek.",
    spots: ["Wisata Religi", "Sentra Kerajinan Bambu"],
    price: "Rp200.000",
    benefits: [
      "Tur budaya & edukasi",
      "Souvenir kerajinan bambu",
      "Makan siang khas Desa Bentek",
    ],
  },
  {
    name: "Paket Petualangan Desa",
    desc: "Rasakan petualangan seru dengan menjelajahi spot-spot unggulan pilihan kami.",
    spots: ["Perkebunan Kopi", "Bukit Panorama", "Air Terjun Mini"],
    price: "Rp250.000",
    benefits: [
      "Pemandu profesional",
      "Peralatan trekking",
      "Minuman hangat di akhir perjalanan",
    ],
  },
];

export default function TravelPackages() {
  // 🔹 Fungsi untuk membuat link WA dinamis
  const createWhatsAppLink = (pkg) => {
    const message = `Halo Admin Wisata Desa Bentek 👋%0ASaya tertarik untuk memesan *${pkg.name}*.%0A%0AInformasi paket:%0A- Deskripsi: ${pkg.desc}%0A- Harga: ${pkg.price}%0A%0AMohon info lebih lanjut mengenai ketersediaan jadwal dan cara pemesanan. Terima kasih! 🙏`;
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

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
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col justify-between"
          >
            <div className="p-6 text-left flex-grow">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {pkg.name}
              </h3>
              <p className="text-gray-600 mb-4">{pkg.desc}</p>

              {/* Harga */}
              <div className="text-lg font-bold text-red-600 mb-4">
                {pkg.price}
              </div>

              {/* Daftar Spot Wisata */}
              <h4 className="font-semibold text-gray-800 mb-2">
                Spot yang dikunjungi:
              </h4>
              <ul className="space-y-2 mb-4">
                {pkg.spots.map((spot, sidx) => (
                  <motion.li
                    key={sidx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: sidx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <CiLocationOn className="text-red-600 text-lg flex-shrink-0" />
                    <span className="font-medium">{spot}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Benefit Paket */}
              <h4 className="font-semibold text-gray-800 mb-2">
                Benefit paket:
              </h4>
              <ul className="space-y-2">
                {pkg.benefits.map((benefit, bidx) => (
                  <li
                    key={bidx}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <FiCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tombol Pesan Sekarang */}
            <div className="p-6 pt-0">
              <a
                href={createWhatsAppLink(pkg)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl transition"
              >
                Pesan Sekarang via WhatsApp
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
