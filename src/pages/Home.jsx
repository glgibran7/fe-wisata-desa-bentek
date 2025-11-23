import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Explore from "../components/Explore";
import TravelPackages from "../components/TravelPackages";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const location = useLocation();

  // === Auto Scroll jika Navbar dipakai dari halaman lain ===
  useEffect(() => {
    const section = location.search.replace("?", "");

    if (section) {
      scroller.scrollTo(section, {
        duration: 600,
        smooth: true,
        offset: -80,
      });
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <Hero />
      <Explore />
      <TravelPackages />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}
