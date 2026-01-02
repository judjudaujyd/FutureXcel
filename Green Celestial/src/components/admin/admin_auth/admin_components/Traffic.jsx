import React, { useEffect, useState } from "react";
import "./traffic.css";
import TotalTraffic from "./traffic_components/TotalTraffic";
import DeviceTypes from "./traffic_components/DeviceTypes";

const Traffic = () => {
  // UseStates
  const [traffic, setTraffic] = useState([]);

    // SORT DATA BASED ON DEVICE
    const [trafficDevices,sortTraffic] = useState({
      mobile : 0,
      tablets : 0,
      laptops : 0,
      largeScreens : 0
    });
  
    const setDeviceTypes = () => {

      const tempRecord = {
        mobile : 0,
        tablets : 0,
        laptops : 0,
        largeScreens : 0
      }
  
      traffic.map((val) => {
        if(val.device == "mobile"){
          tempRecord.mobile += 1;
        }else if(val.device == "tablet"){
          tempRecord.tablets += 1;
        }else if(val.device == "miniLaptop"){
          tempRecord.laptops += 1;
        }else{
          tempRecord.largeScreens += 1;
        }
  
      })

      sortTraffic(tempRecord);
      
    }

  // getTraffic FUNCTION IS USED TO FETCH TRAFFIC REQUESTS FROM BACKEND
  const getTraffic = async () => {
    const reqOpts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };

    try {
      const request = await fetch("http://localhost:8000/traffic", reqOpts);
      if (request.ok) {
        const traficData = await request.json();
        setTraffic(traficData.msg);
      } else {
        console.error("Error Proccesing Traffic Data");
      }
    } catch (error) {
      console.error("Internal Server Error");
    }
  };

  // GET TRAFFIC RESULTS ON RENDER
  useEffect(() => {
    getTraffic();
  }, []);

  useEffect(() => {
    if(traffic.length > 0){
      setDeviceTypes();
    }
  },[traffic])

  return (
    <>
      <div className="adminTraffic">
        <div className="deviceAdminTotalTraffic">
          <TotalTraffic traffic={traffic.length}/>
        </div>
        
        <div className="deviceTypesChart">
          <DeviceTypes traffic={trafficDevices}/>
        </div>

      </div>
    </>
  );
};

export default Traffic;
