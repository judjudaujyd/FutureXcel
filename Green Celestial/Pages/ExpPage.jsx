import React, { useState } from 'react'
import Header from "../src/components/landing_page/Header";
import Exp_Main from '../src/components/experiences/exp_main';
import { useEffect } from 'react';

const ExpPage = () => {
  const [data,setData] = useState();

  useEffect(() => {
    getTeam();
  },[])

  const getTeam = async() => {
    let request = await fetch("http://localhost:8000/team");
    if(request.ok){
      let response = await request.json();
      setData(response);
    }else{
      console.error("Error Connecting To The Server");
    }
    
  }

  return (
    <>
    <Header/>
    <Exp_Main/>
    </>
    )
}

export default ExpPage