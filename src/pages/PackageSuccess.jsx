import React from "react";
import SuccessCard from "./SuccessCard";

function PackageSuccess(){
  return (
    <SuccessCard
      title="Thank You"
      message1="Your package booking has been received successfully."
      message2={
        <>
          Our team is processing your booking. We would get back to you via WhatsApp <strong>shortly</strong>.
        </>
      }
      imageSrc="/assets/img/ticket.png"
      imageAlt="Package Booking"
      buttonText="Back to Home"
      buttonLink= "/"
    />
  );
};

export default PackageSuccess;
