import React from 'react'
import "./services.css"
import Top from '../../../circles/Top'
import Box_cards from '../sub_components/Box_cards'
import ani from "/animation.mp4"
import { services_json } from '../../../static_data/services.js'
import { memo } from 'react'

const Services = () => {
  return (
    <>
    <Top/>
    <div className="services">

    <div className="services_inner">
      <div className="services_head">
        <h1>SERVICES</h1>
      </div>

      <div className="services_cards">

        <div className="animate">
          <video src={ani} muted autoPlay></video>
        </div>

        {/* ===========START OF CARDS============== */}

        {
        services_json.map((data_temp,index) => (
          <Box_cards value = { data_temp } key = {index} />
        ))
        }


        {/* ============END OOF CARDS============== */}
      </div>
    </div>

    </div>

    {/* ================INCLUDING A SEPERATOR DIV===================== */}
    
    <div className="seperator">
        
    </div>
    </>
  )
}

export default memo(Services);