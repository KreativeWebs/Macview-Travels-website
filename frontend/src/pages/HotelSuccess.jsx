import React from "react";
import SuccessCard from "./SuccessCard";

function HotelSuccess() {
  return (
    <SuccessCard
      title="Thank You"
      message1="Your hotel booking request has been received successfully."
      message2={
        <>
          Our team is checking available hotels for your stay. We would get back
          to you via WhatsApp <strong>shortly</strong>.
        </>
      }
      imageSrc="/assets/img/hotel.png"
      imageAlt="Hotel Booking"
      buttonText="Back to Home"
      buttonLink="/"
    />
  );
}

export default HotelSuccess;
