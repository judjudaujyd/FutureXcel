import React from "react";
import Header from "../src/components/landing_page/Header";
import Intro from "../src/components/landing_page/Intro";
import Info from "../src/components/landing_page/Info";
import Mission from "../src/components/landing_page/Mission";
import Services from "../src/components/landing_page/Services";
import Owner from "../src/components/landing_page/Owner"
import Contact from "../src/components/landing_page/Contact";

const Landing = () => {
    return(
        <>
        <Header/>
        <Intro/>
        <Info/>
        <Mission/>
        <Owner/>
        <Services/>
        <Contact/>
        </>
    )
}

export default Landing;