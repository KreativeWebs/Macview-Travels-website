import React from "react";
import SuccessCard from "./SuccessCard";

function VisaSuccess(){
  return (
    <SuccessCard customStyle="p-5"
      title="Thank You"
      message1="Your visa application has been submitted successfully. We would get back to you shortly"
     
      imageSrc="assets\img\visa approved.png"
      imageAlt="Flight Ticket"
      buttonText="Back to Home"
      buttonLink= "/"
    />
  );
};

export default VisaSuccess;