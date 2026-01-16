import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
import BlogSection from "../components/BlogSection";


export default function Home() {
  const { user } = useAuthStore();

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
      <BlogSection />
      <Newsletter />


    </div>
  );
}
