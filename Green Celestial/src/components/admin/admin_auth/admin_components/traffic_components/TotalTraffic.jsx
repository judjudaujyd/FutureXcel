import React from 'react'
import "./totaltraffic.css"
import eye from "/admin/traffic/eye.svg"

const TotalTraffic = ({traffic}) => {
  return (
    <>
    <div className="total_traffic">
        <h2><img src={eye} alt="total traffic" />Total Traffic</h2>
        <h3>{traffic}</h3>
    </div>
    </>
    )
}

export default TotalTraffic;