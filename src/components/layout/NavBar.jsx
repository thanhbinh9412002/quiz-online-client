import React from "react";
import {Nav, Button} from "react-bootstrap";
import { NavLink } from "react-router-dom"
import { MdAdminPanelSettings } from "react-icons/md";
import { BsRocketTakeoff } from "react-icons/bs";
import { FaHome } from "react-icons/fa";



const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top" id="nav-home">
        <div className="container-fluid">
            <NavLink className="navbar-brand text-info" to={"/"}>
                <FaHome /> Online Quiz App
            </NavLink>
            <Button
                variant="outline-info"
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </Button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to={"/admin"}>
                            <MdAdminPanelSettings /> Admin
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={"/quiz-stepper"}>
                            <BsRocketTakeoff /> Take Quiz
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default NavBar