import React from "react";
import { useNavigate } from "react-router-dom";
import HeroHeader from "./HeroHeader";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";


function ManageBookings() {

  return (
    <div>
      <HeroHeader
        heroheaderbg="assets/img/heroheaderbg1.jpg"
        heroheadertitle="Our Services"
        heroheaderdesc="Reliable travel solutions designed to make every journey smooth, safe, and unforgettable."
        pageName="Services"
      />

      </div>
  );
}

export default ManageBookings;
