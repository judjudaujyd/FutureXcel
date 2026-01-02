import React, { useState } from "react";
import "./owner.css";
import rasheed from "/Rasheed.jpg";
import { attributes } from "../../../static_data/owner";

const Owner = () => {
  return (
    <>

      <div className="owner">
        <div className="owner_inner">
          <div className="owner_left">
            <h1><span>Dr.</span> Rasheed Ahmed</h1>
            <p>CEO & Managing Director</p>
            <ul>
                {
                  attributes.map((temp,index) => <li key={index}>{temp}</li>)
                }
            </ul>
            <button>View My CV</button>
          </div>
          <div className="owner_right">
            <img src={rasheed} alt="Dr Rasheed (p.h.D)" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Owner;
