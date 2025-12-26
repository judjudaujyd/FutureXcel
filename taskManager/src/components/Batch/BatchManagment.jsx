import React, { useEffect, useState } from "react";
import BatchTree from "./BatchTree";

const BatchManagment = () => {
  // === HANDLE STATES===
    const [roles,setRoles] = useState([]);
    const [batches,setBatches] = useState([]);

     // === POST A BATCH ===
    const uploadBatch = async(e) => {
        e.preventDefault();
        const form = e.target;

        const batchName = new FormData(e.target).get("batchName");
        if(!batchName.trim()) return;
        console.log(batchName)
        const reqOpts = {
            method : "POST",
            body : JSON.stringify({name : batchName}),
            headers : {
                "content-type" : "application/json"
            }
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/batches`,reqOpts);

            if(!response.ok) console.error("There Was An Error Uploading Batch");
            console.log("BATCH UPLOADED SUCESSFULLY");
            getBatches();
            form.reset();
        }catch(e){
            console.error(e.message ," - ERROR UPLOADING BATCH")
        }
    }

    // === Upload Student ===
    const uploadStudent = async(e) => {
        e.preventDefault();
        const form = e.target;
        const formInfo = new FormData(e.target);

        const role = formInfo.get("role");
        const studentName = formInfo.get("studentName")
        const batchID = formInfo.get("batchID");


        if(!batchID.trim() && !studentName.trim() && !role.trim()) return;

        const reqOpts = {
            method : "POST",
            body : JSON.stringify({name : studentName ,role : role,batchId : batchID}),
            headers : {
                "content-type" : "application/json"
            }
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/batches/member`,reqOpts);

            if(!response.ok) console.error("There Was An Error Uploading Student");
            console.log("STUDENT UPLOADED SUCESSFULLY");
            getBatches();
            form.reset();
        }catch(e){
            console.error(e.message ," - ERROR UPLOADING STUDENT")
        }
    }
    

  // === FETCH ALL ROLES ===
  const getRoles = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/roles`);
      const resData = await response.json();

      if (!response.ok) return;
      setRoles(resData.roles);
    } catch (e) {
      console.error(e.message, " Error Retriving Roles");
    }
  };

  // === FETCH ALL BATCHES ===
  const getBatches = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/batches`);
      const resData = await response.json();

      if (!response.ok) return;
      setBatches(resData.batches);
    } catch (e) {
      console.error(e.message, " Error Retriving Roles");
    }
  };

  // === DELETE A BATCH ===
  const deleteBatch = async(batch_id) => {
    const reqOpts = {
      method : "DELETE",
      body : JSON.stringify({ batchId : batch_id }),
      headers : {
        "Content-Type" : "application/json"
      }
    }

    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/batches`,reqOpts);
      if(!response.ok) return;

      console.log("Batch Deleted Sucessfully");
      getBatches();
    }catch(e){
      console.error(e.message,"Error DELETING BATCH")
    }
  }

  // === DELETE A Member ===
  const deleteMember = async(batch_id,name) => {
    const reqOpts = {
      method : "DELETE",
      body : JSON.stringify({ batchId : batch_id , name : name}),
      headers : {
        "Content-Type" : "application/json"
      }
    }

    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/batches/member`,reqOpts);
      if(!response.ok) return;

      console.log("Batch Deleted Sucessfully");
      getBatches();
    }catch(e){
      console.error(e.message,"Error DELETING BATCH")
    }
  }

    // ===UseEffect===
    useEffect(() => {
        getRoles();
        getBatches();
    },[])
  return (
    <>
      <div className="w-full h-1/10 p-4">
        <h1 className="inline-block border-b-2 border-blue-500 text-md font-semibold p-2">
          Manage Batches
        </h1>
      </div>

      <div className="w-full h-2/10 p-4 grid place-items-center">
        <form className="w-full flex justify-center gap-2" onSubmit={uploadBatch}>
          <input
            className="w-2/3 p-2 bg-blue-50 focus:outline-none outline-2 outline-blue-100 hover:outline-blue-300 rounded-md"
            type="text"
            name="batchName"
            placeholder="Adding a Batch?"
            required
          />
          <button
            type="submit"
            className="w-1/3 transition-all duration-100 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            Add Batch
          </button>
        </form>
      </div>

      <div className="w-full h-1/10 p-4">
        <h1 className="inline-block border-b-2 border-blue-500 text-md font-semibold p-2 flex-end">
          Manage Students
        </h1>
      </div>

      <div className="w-full h-3/10 p-4">
        <form className="w-full grid grid-cols-3 gap-2" onSubmit={uploadStudent}>
          <input
            className="col-span-2 p-2 bg-blue-50 focus:outline-none outline-2 outline-blue-100 hover:outline-blue-300 rounded-md"
            type="text"
            name="studentName"
            placeholder="Adding a Student?"
            required
          />

          <select className="p-2 bg-blue-50 focus:outline-none outline-2 outline-blue-100 hover:outline-blue-300 rounded-md" name="batchID">
          {
            batches.map((data,i) => (
                <option value={data._id} key={i}>{data.name}</option>
            ))
          }
          </select>

          <select className="col-span-2 md:col-span-1 p-2 bg-blue-50 focus:outline-none outline-2 outline-blue-100 hover:outline-blue-300 rounded-md" name="role">
          {
            roles.map((data,i) => (
                <option value={data.role} key={i}>{data.role}</option>
            ))
          }
          </select>

          <button
            type="submit"
            className="col-span-1 md:col-span-1 transition-all duration-100 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            Add Student
          </button>
        </form>
      </div>

      <div className="w-full h-4/10 p-4">
          <BatchTree batches={batches} deleteBatch={deleteBatch} deleteMember={deleteMember} />
      </div>
    </>
  );
};

export default BatchManagment;
