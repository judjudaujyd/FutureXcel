import React, { useEffect, useState } from "react";
import "./traffic.css";
import TotalTraffic from "./traffic_components/TotalTraffic";
import DeviceTypes from "./traffic_components/DeviceTypes";
import DailyTrafficChart from "./traffic_components/DailyTrafficChart";

const Traffic = () => {
  // UseStates
  const [traffic, setTraffic] = useState([]);
  const [trafficStats, setTrafficStats] = useState([]);

  // SORT DATA BASED ON DEVICE
  const [trafficDevices, sortTraffic] = useState({
    mobile: 0,
    tablets: 0,
    laptops: 0,
    largeScreens: 0
  });

  const setDeviceTypes = () => {

    const tempRecord = {
      mobile: 0,
      tablets: 0,
      laptops: 0,
      largeScreens: 0
    }

    traffic.map((val) => {
      if (val.device == "mobile") {
        tempRecord.mobile += 1;
      } else if (val.device == "tablet") {
        tempRecord.tablets += 1;
      } else if (val.device == "miniLaptop") {
        tempRecord.laptops += 1;
      } else {
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

  const getTrafficStats = async () => {
    try {
      const response = await fetch("http://localhost:8000/traffic/stats");
      if (response.ok) {
        const data = await response.json();
        setTrafficStats(data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const exportCSV = () => {
    const headers = ["Device", "IP", "Date"];
    const csvContent = [
      headers.join(","),
      ...traffic.map(item => [item.device, item.ip, item.date].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "traffic_data.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // GET TRAFFIC RESULTS ON RENDER
  useEffect(() => {
    getTraffic();
    getTrafficStats();
  }, []);

  useEffect(() => {
    if (traffic.length > 0) {
      setDeviceTypes();
    }
  }, [traffic])

  return (
    <>
      <div className="adminTraffic">
        <div className="deviceAdminTotalTraffic">
          <TotalTraffic traffic={traffic.length} />
        </div>

        <div className="deviceTypesChart">
          <DeviceTypes traffic={trafficDevices} />
        </div>

        <div className="dailyTrafficChart" style={{ marginTop: '2rem', padding: '1rem', background: '#fff', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Daily Traffic Stats</h3>
            <button onClick={exportCSV} style={{ padding: '0.5rem 1rem', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Export CSV</button>
          </div>
          <DailyTrafficChart data={trafficStats} />
        </div>

      </div>
    </>
  );
};

export default Traffic;
