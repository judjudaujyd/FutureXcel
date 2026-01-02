import React from 'react'
import why from "/why.svg"
import "./info.css"

const Info = () => {
  return (
    <>
    <div className="info">
        <div className="info_inner">
            <div className="info_top">
                <img src={why} alt="" />
                <h2> WHAT IS GREEN CELESTIAL</h2>
            </div>
            <div className="info_para">
                <p>This company is a giant venture of academia, researchers, scholars, and professional experts to provide their services for assessments, drawing, designing and consultancy in the field of natural resources management and civil works(town/ city planning) such as water resources management, irrigation systems, urban flood risk assessments, urban drainage systems, land suitability and compatibility, land reclamation, landscape, horticulture, floriculture, water quality modeling, climate smart agriculture, environment hazards and risks. Our experts evaluate problems with the help of modern tools (ArcGIS, HEC-RAS, SWMM, AutoCAD, Sketchup Pro, ArchiCAD, TR-55 and CropWAT, etc) and provide solution according to the TORs of the customers.</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Info