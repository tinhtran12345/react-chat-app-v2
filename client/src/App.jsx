import { Navigate, Route, Routes } from "react-router-dom";
import { Chat, Login, Register } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navibar } from "./components";
import { ChatContextProvider } from "./context/ChatContext";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
    const { user } = useContext(AuthContext);
    return (
        <ChatContextProvider user={user}>
            <Navibar />
            <Container className="text-secondary">
                <Routes>
                    <Route path="/" element={<Chat />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Container>
        </ChatContextProvider>
    );
}

export default App;
