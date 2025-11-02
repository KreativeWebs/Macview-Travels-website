import React from "react";
import SuccessCard from "./SuccessCard";

function FlightSuccess(){
  return (
    <SuccessCard
      title="Thank You"
      message1="Your flight request has been received successfully."
      message2={
        <>
          Our team is checking available flights for your trip. We would get back to you via WhatsApp <strong>shortly</strong>.
        </>
      }
      imageSrc="/assets/img/ticket.png"
      imageAlt="Flight Ticket"
      buttonText="Back to Home"
      buttonLink= "/"
    />
  );
};

export default FlightSuccess;