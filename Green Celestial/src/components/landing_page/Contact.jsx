import React from 'react'
import "./contact.css"
import { contact_info } from '../../../static_data/contact.js'
import Contact_item from '../sub_components/Contact_item'

const Contact = () => {
  return (
    <>
    <div className="contact">
        <div className="contact_inner">
            <div className="contact_left">
                <div className="left_inner">
                    <b>Contact Us</b>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d423495.18721683935!2d72.911766!3d33.978246!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfb3a06171cdf9%3A0x69125029615bf533!2sBusiness%20incubation%20Center!5e0!3m2!1sen!2sus!4v1726166993997!5m2!1sen!2sus" loading='lazy'></iframe>
                </div>
            </div>
            <div className="contact_right">
                {
                    contact_info.map((val,index) => <Contact_item val_in={val} key={index} />)
                }

                <b>WE ARE AVALIBE FROM 10AM - 6PM</b>
            </div>
        </div>
    </div>
    </>
)
}

export default Contact