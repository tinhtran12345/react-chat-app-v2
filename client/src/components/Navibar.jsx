import React, { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/chat-app-logo-v2.png";
import { AuthContext } from "../context/AuthContext";
const Navibar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    return (
        <Navbar
            className="mb-4 bg-primary text-emphasis-primary"
            style={{ height: "4rem" }}
        >
            <Container>
                <Stack className="d-flex flex-row">
                    <div className="nav-bar">
                        <img
                            src={logo}
                            alt="chat-app-logo-v2"
                            style={{ height: "100px", width: "100px" }}
                        />
                        <Link
                            to={"/"}
                            className="link-light text-decoration-none fs-4"
                        >
                            Chatapp
                        </Link>
                    </div>
                </Stack>
                <Nav>
                    <Stack
                        direction="horizontal"
                        gap={3}
                        className="focus-ring focus-ring-primary "
                    >
                        {user && (
                            <span className="text-warning">
                                Logged in as {user?.name}
                            </span>
                        )}
                        {user && (
                            <>
                                <Link
                                    onClick={() => logoutUser()}
                                    to={"/login"}
                                    className="btn btn-primary link-light text-decoration-none fs-6 d-inline-flex focus-ring focus-ring-primary py-1 px-4 text-decoration-none border rounded-2"
                                >
                                    Logout
                                </Link>
                            </>
                        )}
                        {!user && (
                            <>
                                <Link
                                    to={"/login"}
                                    className="btn btn-primary link-light text-decoration-none fs-6 d-inline-flex focus-ring focus-ring-primary py-1 px-4 text-decoration-none border rounded-2"
                                >
                                    Login
                                </Link>
                                <Link
                                    to={"/register"}
                                    className=" btn btn-primary link-light text-decoration-none fs-6 d-inline-flex focus-ring focus-ring-primary py-1 px-4 text-decoration-none border rounded-2"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Navibar;
