import React from "react";
import { Stack, Spinner } from "react-bootstrap";

const Loading = ({ text }) => {
    return (
        <Stack
            className="d-flex flex-row align-items-center text-center justify-content-center"
            gap={3}
        >
            <Spinner animation="border" role="status">
                <span className="visually-hidden">{text}</span>
            </Spinner>
            <p className="mb-0">{text}</p>
        </Stack>
    );
};

export default Loading;
