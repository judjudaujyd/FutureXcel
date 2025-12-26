import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RoleManagment = () => {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

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

  // ==== POST A ROLE ===
  const handleRole = async (e) => {
    e.preventDefault();
    const roleText = new FormData(e.target).get("roleText");
    if (!roleText.trim()) return;
    const reqOpts = {
      method: "POST",
      body: JSON.stringify({ role: roleText }),
      headers: {
        "content-type": "application/json",
      },
    };

    try {
      console.log(import.meta.env.VITE_API_URL);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/roles`,
        reqOpts
      );
      const resData = await response.json();

      if (!response.ok) return;
      console.log("Role Posted");
      getRoles();
    } catch (e) {
      console.error(e.message, "Error Posting Role");
    }
  };

  // === DELETE A ROLE ===

  const deleteRole = async (roleName) => {
    const reqOpts = {
      method: "DELETE",
      body: JSON.stringify({ role: roleName }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/roles`,
        reqOpts
      );
      if (!response.ok) return;

      console.log("Role Deleted Succesfully");
      getRoles();
    } catch (e) {
      console.error(e.message, " Error Deleting Role");
    }
  };
  // === SETTING DEFAULT USEEFFECT ===
  useEffect(() => {
    getRoles();
  }, []);
  return (
    <>
      <div className="w-full h-2/10 flex flex-col items-center justify-center p-4">
        <form
          onSubmit={handleRole}
          className="w-9/10 flex flex-col items-center gap-y-2"
        >
          <input
            className="transition-all duration-100 w-full p-2 bg-blue-50 focus:outline-none outline-2 outline-blue-100 hover:outline-blue-300 rounded-md"
            type="text"
            name="roleText"
            placeholder="Adding a Role?"
          />
          <button
            type="submit"
            className="transition-all duration-100 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            Add Role
          </button>
        </form>
      </div>

      <div className="w-full h-7/10 flex flex-col gap-y-2 p-4 items-center">
        {roles.map((data, i) => (
          <div
            key={i}
            className="group relative w-9/10 mx-auto px-3 py-2 flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 hover:scale-[1.02] hover:shadow-indigo-500/50 transition-all duration-300">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition"></div>

            {/* Role name */}
            <p className="relative z-10 text-white text-sm font-semibold tracking-wide">
              {data.role}
            </p>

            {/* Delete button */}
            <button
              onClick={() => deleteRole(data.role)}
              className="relative z-10 p-2 rounded-full bg-white/20 backdrop-blur hover:bg-red-500 transition-all duration-200 hover:rotate-12 hover:scale-110"
              title="Delete role"
            >
              <img src="/bin.svg" width="18" height="18" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default RoleManagment;
