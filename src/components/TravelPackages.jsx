import { useEffect, useState } from "react";
import Api from "../utils/Api";
import { motion } from "framer-motion";
import { CiLocationOn } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const whatsappNumber = "6282867542132";

export default function TravelPackages() {
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch paket + destinasi
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [paketRes, destRes] = await Promise.all([
          Api.get("/paket"),
          Api.get("/destinasi"),
        ]);

        setPackages(paketRes.data);
        setDestinations(destRes.data);
      } catch (err) {
        console.error("Gagal memuat paket:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Convert ID destinasi ke nama
  const getDestinationNames = (ids = []) => {
    return ids
      .map((id) => {
        const found = destinations.find((d) => d.id_destination === id);
        return found ? found.name : `ID ${id}`;
      })
      .filter(Boolean);
  };

  const createWhatsAppLink = (pkg) => {
    const message = `Halo Admin Wisata Desa Bentek 👋%0ASaya tertarik untuk memesan *${
      pkg.name
    }*.%0A%0AInformasi paket:%0A- Deskripsi: ${
      pkg.description
    }%0A- Harga: Rp${pkg.price.toLocaleString()}%0A%0AMohon info lebih lanjut mengenai ketersediaan jadwal dan cara pemesanan. Terima kasih! 🙏`;
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  return (
    <section id="packages" className="py-16 bg-[#fcf2e8] text-center px-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4"
      >
        Paket Perjalanan Wisata
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 mb-12 max-w-2xl mx-auto"
      >
        Pilih paket sesuai minatmu dan nikmati pengalaman tak terlupakan di Desa
        Bentek.
      </motion.p>

      {/* LOADING SKELETON */}
      {loading ? (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-80 bg-white rounded-2xl animate-pulse shadow"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {packages.map((pkg, idx) => {
            const spotNames = getDestinationNames(pkg.destinations);

            return (
              <motion.div
                key={pkg.id_package}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                className="group relative bg-white/90 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col border border-orange-100"
              >
                {/* IMAGE (if exist) */}
                {pkg.image_url && (
                  <img
                    src={pkg.image_url}
                    alt={pkg.name}
                    className="w-full h-48 object-cover"
                  />
                )}

                {/* Konten utama */}
                <div className="p-6 text-left flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition">
                    {pkg.name}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Harga */}
                  <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow mb-5">
                    Rp{pkg.price.toLocaleString()}
                  </div>

                  {/* Destinasi */}
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Spot yang dikunjungi:
                  </h4>
                  <ul className="space-y-2 mb-4">
                    {spotNames.map((spot, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <CiLocationOn className="text-orange-500 text-lg flex-shrink-0" />
                        <span>{spot}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Benefits */}
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Benefit paket:
                  </h4>
                  <ul className="space-y-2">
                    {pkg.benefits?.length > 0 ? (
                      pkg.benefits.map((benefit, bidx) => (
                        <li
                          key={bidx}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <FiCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">Tidak ada benefit</li>
                    )}
                  </ul>
                </div>

                {/* Tombol Pesan */}
                <div className="p-6 pt-0">
                  <a
                    href={createWhatsAppLink(pkg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl transition-all shadow-md"
                  >
                    <FaWhatsapp className="text-xl" /> Booking Sekarang
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
