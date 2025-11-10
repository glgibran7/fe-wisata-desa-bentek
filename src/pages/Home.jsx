import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Explore from "../components/Explore";
import TravelPackages from "../components/TravelPackages";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Explore />
      <TravelPackages />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
