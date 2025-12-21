import { useEffect } from "react";
import { Modal } from "bootstrap";
import { useAuthStore } from "../store/authStore";
import Hero from "./Hero";
import About from "./About";
import WhatWeOffer from "./WhatWeOffer";
import Destination from "./Destination";
import FeaturedPackages from "./FeaturedPackages";
import FlashSales from "./FlashSales";
import VisaCatalogue from "./VisaCatalogue";
import Process from "./Process";
import Testimonial from "./Testimonial";
import Newsletter from "./Newsletter";
import FeaturedHotels from "./FeaturedHotels";


export default function Home() {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        const loginModalElement = document.getElementById("loginModal");
        if (loginModalElement && !loginModalElement.classList.contains('show')) {
          const loginModal = Modal.getOrCreateInstance(loginModalElement);
          loginModal.show();
        }
      }, 10000); // 10seconds = 10000 milliseconds

      return () => clearTimeout(timer);
    }
  }, [user]);
  return (
    <div
      style={{
        fontFamily:
          "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
      }}
    >
      <Hero />
      <About />
      <WhatWeOffer />
      <Destination />
      <FeaturedPackages />
      <FlashSales />
      <FeaturedHotels />
      <VisaCatalogue />
      <Process />
      <Testimonial />
      <Newsletter />
      
      
    </div>
  );
}
