import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { remove } from "../../redux/action";
import apiService from "../../services/apiService";

function Sidebar(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        apiService.logout();
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        dispatch(remove());
        navigate("/");
    };

    return (
        <aside
            className="main-sidebar sidebar-dark-primary elevation-4"
            style={{ position: "fixed" }}
        >
            <a className="brand-link">
                <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="brand-image img-circle elevation-3"
                />
                <span className="brand-text font-weight-light"> My App</span>
            </a>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src="/images/user.png"
                            className="img-circle elevation-2"
                            alt="img"
                        />
                    </div>
                    <div className="info">
                        <a className="d-block">Username</a>
                    </div>
                </div>
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        {props.perms?.indexOf("view student") != -1 && (
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">
                                    <i className="nav-icon fas fa-user-graduate"></i>
                                    <p>Students</p>
                                </Link>
                            </li>
                        )}

                        {props.perms?.indexOf("view user") != -1 && (
                            <li className="nav-item">
                                <Link to="/user" className="nav-link">
                                    <i className="nav-icon fas fa-user-friends"></i>
                                    <p>Users</p>
                                </Link>
                            </li>
                        )}

                        {props.perms?.indexOf("view role") != -1 && (
                            <li className="nav-item">
                                <Link to="/role" className="nav-link">
                                    <i className="nav-icon fas fa-user-tag"></i>
                                    <p>Role</p>
                                </Link>
                            </li>
                        )}

                        {props.perms?.indexOf("view permission") != -1 && (
                            <li className="nav-item">
                                <Link to="/permission" className="nav-link">
                                    <i className="nav-icon fas fa-clipboard-list"></i>
                                    <p>Permision</p>
                                </Link>
                            </li>
                        )}

                        <li className="nav-item" onClick={logout}>
                            <a className="nav-link">
                                <i className="nav-icon fas fa-sign-out-alt"></i>
                                <p>Log out</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
