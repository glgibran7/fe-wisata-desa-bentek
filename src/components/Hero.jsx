import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/images/logo_wisata_desa_bentek.png";
import maps from "../assets/images/map_wisata_desa_bentek.png";

export default function Hero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: "easeOut" },
    }),
  };

  return (
    <section
      id="home"
      className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#fcf2e8] px-4 sm:px-8 md:px-20 lg:px-12 py-12 overflow-hidden"
    >
      {/* Kiri: Logo + Teks */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10 md:pl-8 lg:pl-12">
        {/* Logo */}
        <motion.img
          src={logo}
          alt="Logo Wisata Desa Bentek"
          className="w-[160px] sm:w-[200px] md:w-[230px] h-auto mb-2 drop-shadow-lg md:-ml-6 lg:-ml-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          custom={0.1}
          whileHover={{ scale: 1.05 }}
        />

        {/* Teks Utama */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          custom={0.3}
        >
          Selamat Datang di{" "}
          <span className="text-[#c97b2f]">Wisata Desa Bentek</span>
        </motion.h1>

        {/* Paragraf */}
        <motion.p
          className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed max-w-md px-2 md:px-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          custom={0.5}
        >
          Temukan keindahan alam yang tersembunyi, budaya yang kaya, dan
          petualangan tak terlupakan. Eksplorasi dimulai di sini!
        </motion.p>

        {/* Di HP: Peta muncul sebelum tombol */}
        <motion.div
          className="flex flex-col items-center w-full md:hidden mt-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.img
            src={maps}
            alt="Peta Wisata Desa Bentek"
            className="w-[280px] sm:w-[340px] h-auto object-contain drop-shadow-xl mb-6"
            variants={fadeUp}
            custom={0.6}
            whileHover={{ scale: 1.05 }}
          />

          <motion.a
            href="#explore"
            className="bg-[#c97b2f] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#a86323] hover:shadow-lg transition-all duration-300"
            variants={fadeUp}
            custom={0.8}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Mulai Eksplorasi
          </motion.a>
        </motion.div>

        {/* Tombol (desktop) */}
        <motion.a
          href="#explore"
          className="hidden md:inline-block mt-6 bg-[#c97b2f] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#a86323] hover:shadow-lg transition-all duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          custom={0.7}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Mulai Eksplorasi
        </motion.a>
      </div>

      {/* Kanan: Peta (desktop) */}
      <motion.div
        className="hidden md:flex w-full md:w-1/2 justify-center md:justify-end z-10"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
      >
        <motion.img
          src={maps}
          alt="Peta Wisata Desa Bentek"
          className="w-[380px] md:w-[420px] h-auto object-contain drop-shadow-xl"
          whileHover={{ scale: 1.05, rotate: 1 }}
        />
      </motion.div>
    </section>
  );
}
