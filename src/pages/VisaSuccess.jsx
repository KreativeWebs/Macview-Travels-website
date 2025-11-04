import React from "react";
import SuccessCard from "./SuccessCard";

function VisaSuccess(){
  return (
    <SuccessCard
      title="Thank You"
      message1="Your visa application submitted successfully."
      message2={
        <>
         Your application has been received successfully. We’ll get back to you<strong>shortly</strong>.
        </>
      }
      imageSrc="/assets/img/ticket.png"
      imageAlt="Flight Ticket"
      buttonText="Back to Home"
      buttonLink= "/"
    />
  );
};

export default VisaSuccess;