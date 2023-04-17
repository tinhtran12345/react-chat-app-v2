import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../services/service";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user));
    }, []);

    const loginUser = useCallback(
        async (e) => {
            e.preventDefault();
            setIsLoginLoading(true);
            setLoginError(null);
            setTimeout(async () => {
                const response = await postRequest(
                    `${baseUrl}/users/login`,
                    JSON.stringify(loginInfo)
                );
                setIsLoginLoading(false);
                if (response.error) {
                    return setLoginError(response);
                }
                localStorage.setItem("User", JSON.stringify(response));
                setUser(response);
                navigate("/");
            }, 3000);
        },
        [loginInfo]
    );

    const registerUser = useCallback(
        async (e) => {
            e.preventDefault();
            setIsRegisterLoading(true);
            setRegisterError(null);
            setTimeout(async () => {
                const response = await postRequest(
                    `${baseUrl}/users/register`,
                    JSON.stringify(registerInfo)
                );
                setIsRegisterLoading(true);
                if (response.error) {
                    return setRegisterError(response);
                }
                localStorage.setItem("User", JSON.stringify(response));
                setUser(response);
                navigate("/");
            }, 3000);
        },
        [registerInfo]
    );
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);
    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);
    }, []);
    return (
        <AuthContext.Provider
            value={{
                user,
                registerInfo,
                updateRegisterInfo,
                registerError,
                registerUser,
                isRegisterLoading,
                logoutUser,
                loginUser,
                loginError,
                loginInfo,
                isLoginLoading,
                updateLoginInfo,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
