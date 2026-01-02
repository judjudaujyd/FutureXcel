import React from 'react'
import fade from "/fade.png"
import "./mission.css"

const Mission = () => {
  return (
    <>
        <div className="mission">
            <div className="fade">
                {/* <img src={fade}/> */}
                <h2>OUR MISSION</h2>
            </div>
            <div className="mission_para">
                <div className="mission_para_inner">
                    <p>Our mission is to achieve the sustainable development with an initiative to mobilize capitals and efforts in protecting, conserving, and managing our environment and resources. We are providing platforms to all national and international organizations to get consultation related to civil works, agriculture production systems, forestland management, rangeland protections, horticulture gardening and environmental assessments.Our experts evaluate problems with the help of modern tools (ArcGIS, HEC-RAS, SWMM, AutoCAD, Sketchup Pro, ArchiCAD, TR-55 and CropWAT) and provide solution according to the TORs of the customers.Our consultation is an affirm technical solution accommodating environmental protection and restoring mechanism with maximum achievement in term of low capital investment, built-in mechanism, and on-time completion of assigned tasks.</p>
                </div>
            </div>
        </div>
        <div className="seperator">
        
        </div>
    </>
    )
}

export default Mission