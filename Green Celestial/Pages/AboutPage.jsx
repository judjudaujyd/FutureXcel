import React from 'react'
import Header from "../src/components/landing_page/Header";
import AboutHead from '../src/components/about_page/AboutHead';
import AboutDesc from '../src/components/about_page/AboutDesc';
import Strive from '../src/components/about_page/Strive';
import Avalibility from '../src/components/about_page/Avalibility';
import Contact from "../src/components/landing_page/Contact";

const AboutPage = () => {
  return (
    <>
    <Header/>
    <AboutHead/>
    <AboutDesc/>
    <Strive/>
    <Avalibility/>
    <Contact/>
    </>
  )
}

export default AboutPage