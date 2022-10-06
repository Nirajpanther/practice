import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import apiRole from "../services/apiRole";
import Footer from "./subfiles/Footer";
import Sidebar from "./subfiles/Sidebar";

function Component() {
  const [perms, setPerms] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    apiRole.showRole(user.role_id).then((res) => {
      const arr = [];
      res.map((elem) => {
        arr.push(elem.name);
      });
      setPerms(arr);
    });
  }, []);

  return (
    <>
      <Sidebar perms={perms} />
      <div className="content-wrapper" id="screen">
        <Outlet context={perms} />
      </div>
      <Footer />
    </>
  );
}

function Main() {
  return localStorage.getItem("token") ? <Component /> : <Navigate to="/" />;
}

export { Main };
