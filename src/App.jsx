import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Packages from './pages/Packages'
import VisaProcessing from './pages/VisaProcessing'
import FlightBooking from './pages/FlightBooking'
import HotelBooking from './pages/HotelBooking'
import StudyAbroad from './pages/StudyAbroad'
import Destination from './pages/Destination'
import Booking from './pages/Booking'
import Team from './pages/Team'
import Testimonial from './pages/Testimonial'
import Contact from './pages/Contact'

export default function App() {
  return (
    <div>
        <Header />
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/packages' element={<Packages/>}/>
        <Route path='/visaprocessing' element={<VisaProcessing/>}/>
        <Route path='/flightbooking' element={<FlightBooking/>}/>
        <Route path='/hotelbooking' element={<HotelBooking/>}/>
        <Route path='/studyabroadprograms' element={<StudyAbroad/>}/>
        <Route path='/destination' element={<Destination/>}/>
        <Route path='/booking' element={<Booking/>}/>
        <Route path='/team' element={<Team/>}/>
        <Route path='/testimonial' element={<Testimonial/>}/>
        <Route path='/contact' element={<Contact/>}/>
        </Routes>
        <Footer />
    </div>
  )
}
