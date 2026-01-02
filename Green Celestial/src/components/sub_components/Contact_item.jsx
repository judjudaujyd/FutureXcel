import React from 'react'
import "./contact_item.css"

const Contact_item = ({ val_in }) => {
    let image_url = val_in.img;
    let items = val_in.info;
  return (
        <>
        <div className="contact_item">
            <img src={image_url} />
            {
                items.map((val,index) => <small key={index}><b>{val}</b></small> )
            }
        </div>
        </>
    )
}

export default Contact_item