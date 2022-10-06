import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import apiRole from "../services/apiRole";
import Footer from "./subfiles/Footer";
import Sidebar from "./subfiles/Sidebar";
import apiUser from "../services/apiUser";
import { token } from "../redux/action";

function Component() {
    const [perms, setPerms] = useState([]);
    const dispatch = useDispatch();

    const getUserRole = (id) => {
        apiRole.showRole(id).then((res) => {
            const arr = [];
            res.map((elem) => {
                arr.push(elem.name);
            });
            setPerms(arr);
        });
    };

    useEffect(() => {
        dispatch(token(localStorage.getItem("token")));
        apiUser.logedUser().then((res) => getUserRole(res.role_id));
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
