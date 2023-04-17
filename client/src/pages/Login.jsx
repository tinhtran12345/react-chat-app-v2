import React, { useContext } from "react";
import { Form, Button, Row, Col, Alert, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Loading } from "../components";
const Login = () => {
    const {
        loginUser,
        loginError,
        loginInfo,
        isLoginLoading,
        updateLoginInfo,
    } = useContext(AuthContext);
    return (
        <>
            <Form onSubmit={loginUser}>
                <Row
                    style={{
                        height: "100vh",
                        justifyContent: "center",
                        paddingTop: "10px",
                    }}
                >
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2 className="fw-bold text-light">Login</h2>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                onChange={(e) =>
                                    updateLoginInfo({
                                        ...loginInfo,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) =>
                                    updateLoginInfo({
                                        ...loginInfo,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <Button variant="primary" type="submit">
                                {isLoginLoading ? (
                                    <Loading text={"Loading ..."} />
                                ) : (
                                    "Login"
                                )}
                            </Button>

                            {loginError?.error && (
                                <Alert
                                    variant="danger"
                                    className="d-flex justify-content-center align-items-center"
                                >
                                    <p>{loginError?.message} </p>
                                </Alert>
                            )}
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Login;
