import React from 'react'
import "./topmenu.css"

const Topmenu = ({menu,setMenu}) => {
  return (
    <>
    <div className="admin_top_menu">
        <div className="admin_menu_left">
            <img src="/admin/adminHam.svg" height="45px" loading='lazy'  alt="ham" onClick={() => setMenu(!menu)}/>
        </div>
        <div className="admin_menu_right">
            <h3>Dark_Knight</h3>
            <img src="/tester.jpeg" height="50px" loading='lazy' alt="P_pic" />
        </div>
    </div>
    </>    
  )
}

export default Topmenu