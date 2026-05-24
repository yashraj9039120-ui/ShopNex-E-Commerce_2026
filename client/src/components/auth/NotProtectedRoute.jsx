import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import ImageSlider from "../home/ImageSlider";


const NotProtectedLayout=()=> {
  return (
 <>
      {/* Navbar Section */}
     
     <Navbar/>

      {/* Main Content Section */}
    
        <Outlet />
   

      {/* Additional Sections */}
      <ImageSlider />
{/* 
      <Team/> */}
{/* 
      <Chatbot/> */}
    
      <Footer />
      </>
  );
}

export default NotProtectedLayout;

