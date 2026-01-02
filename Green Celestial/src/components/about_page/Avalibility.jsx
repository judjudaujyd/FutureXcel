import React from "react";
import "./avalibility.css";

const Avalibility = () => {
  const avalibleAreas = [
    {
      img: "/aboutUs/govt.svg",
      title: "Governmental Departments",
      desc: "Governmental Departments of Agriculture, Forestry, Watershed and Wildlife Management, Tehsil Municipal Office and Public Health, Environmental Protection Agencies, Irrigation and Fishery, City Planning Units and Water Resources",
    },
    {
      img: "/aboutUs/nonGovt.svg",
      title: "Non-Government Organizations",
      desc: "Non-Government Organizations including UN organizations, NGOs, Private Sector housing colonies and construction industry",
    },
    {
      img: "/aboutUs/inter.svg",
      title: "National and international Academia Organization",
      desc: "National and international Academia Organization/ Universities to collaborate research findings and information",
    },
  ];

  return (
    <>
      <div className="avalibility">
        <div className="avalibilityInner">
          {avalibleAreas.map((val, index) => {
            return (
              <div className="avalibilityCards" key={index}>
                <img src={val.img} width="40%" loading="lazy"/>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            );
          })}

          <div className="avalibility_header_card">
            <h3>WE OPERATE EVERYWHERE!</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Avalibility;
