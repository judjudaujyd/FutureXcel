import React, { useState } from 'react'
import Header from "../src/components/landing_page/Header";
import API_BASE_URL from '../src/config/api';
import Exp_Main from '../src/components/experiences/Exp_Main';
import { useEffect } from 'react';

const ExpPage = () => {
  const [team, setTeam] = useState([]);
  const [vision, setVision] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getTeam();
    getVision();
    getProjects();
  }, [])

  const getTeam = async () => {
    try {
      let request = await fetch(`${API_BASE_URL}/team`);
      if (request.ok) {
        let response = await request.json();
        setTeam(response);
      }
    } catch (e) { console.error(e); }
  }

  const getVision = async () => {
    try {
      let request = await fetch(`${API_BASE_URL}/vision`);
      if (request.ok) {
        let response = await request.json();
        setVision(response.content);
      }
    } catch (e) { console.error(e); }
  }

  const getProjects = async () => {
    try {
      let request = await fetch(`${API_BASE_URL}/projects?limit=3`);
      if (request.ok) {
        let response = await request.json();
        setProjects(response.projects);
      }
    } catch (e) { console.error(e); }
  }

  return (
    <>
      <Header />
      <Exp_Main team={team} vision={vision} projects={projects} />
    </>
  )
}

export default ExpPage