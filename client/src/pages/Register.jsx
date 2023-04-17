import React, { useContext } from "react";
import { Form, Button, Row, Col, Alert, Stack, Spinner } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Loading } from "../components";

const Register = () => {
    const {
        user,
        registerInfo,
        updateRegisterInfo,
        registerError,
        registerUser,
        isRegisterLoading,
    } = useContext(AuthContext);

    return (
        <>
            <Form onSubmit={registerUser}>
                <Row
                    style={{
                        height: "100vh",
                        justifyContent: "center",
                        paddingTop: "10px",
                    }}
                >
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2 className="fw-bold text-light">Register</h2>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                onChange={(e) =>
                                    updateRegisterInfo({
                                        ...registerInfo,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                onChange={(e) =>
                                    updateRegisterInfo({
                                        ...registerInfo,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) =>
                                    updateRegisterInfo({
                                        ...registerInfo,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <Button variant="primary" type="submit">
                                {isRegisterLoading ? (
                                    <Loading
                                        text={"Creating your account..."}
                                    />
                                ) : (
                                    "Register"
                                )}
                            </Button>
                            {registerError?.error && (
                                <Alert
                                    variant="danger"
                                    className="d-flex justify-content-center align-items-center"
                                >
                                    <p>{registerError?.message} </p>
                                </Alert>
                            )}
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Register;
