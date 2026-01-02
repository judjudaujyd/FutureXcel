import React, { useState } from 'react'
import "./header.css"
import logo  from "/logo_two.svg"
import ham from "/ham.svg"
import { Link } from 'react-router-dom'

const Header = () => {

    const [slider,setslider] = useState("-100%");
    const [ham_sty,setHam] = useState({
        padding : "0px",
        border : "0px solid var(--hard-blue)"
    })

    const handleSlider = () => {
        if(slider == "0%"){
            setslider("-100%");
            setHam({
                height : "20px",
                margin : "25px 0px",
                border : "0px solid var(--hard-blue)",
                padding : "0px"
            });
        }else{
            setslider("0%");
            setHam({
                height : "30px",
                margin : "20px 0px",
                border : "1px solid var(--hard-blue)",
                padding : "5px"
            });
        }
    }

  return (
    <>
    <header>
       <div className="head_inner">
        <div className="header_left">
                <img src={logo} alt="logo" />
                <h2>Green <span>Celestial</span></h2>
            </div>

            <div className="feedback">
                <button>Our Store</button>
            </div>
            
            <nav>
                <ul className='nav_ul'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/blogs">Blogs</Link></li>
                    <li><Link to={"/exp"}>Experiences</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>
                <ul className='mob_nav'>
                    <li>
                        <img src={ham} style={ham_sty} onClick={handleSlider}/>
                    </li>
                </ul>
            </nav>
            
       </div>
       <div className="nav_sec" style={{left : slider}}>
        
       </div>
    </header>
    </>
  )
}

export default Header;