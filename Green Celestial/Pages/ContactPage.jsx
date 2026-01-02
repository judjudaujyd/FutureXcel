import React from 'react'
import Header from '../src/components/landing_page/Header'
import ContactHead from '../src/components/contact_page/ContactHead'
import ContactDesc from '../src/components/contact_page/ContactDesc'
import Contact from "../src/components/landing_page/Contact"

const ContactPage = () => {
  return (
    <>
    <Header/>
    <ContactHead/>
    <ContactDesc/>
    <Contact/>

    </>
  )
}

export default ContactPage