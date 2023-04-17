import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest, getRequest } from "../services/service";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, SetSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    console.log(onlineUsers);

    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    useEffect(() => {
        if (socket === null) return;
        socket.emit("addNewUser", user?._id);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        });

        return () => {
            socket.off("getOnlineUsers");
        };
    }, [socket]);

    useEffect(() => {
        if (socket === null) return;
        const recipientId = chat?.members?.find((id) => id !== user?._id);

        socket.emit("sendMessage", { ...newMessage, recipientId });
    }, [newMessage]);

    useEffect(() => {
        const getUser = async () => {
            // get all user in db
            const response = await getRequest(`${baseUrl}/users`);
            if (response.error) {
                return console.log("Error fetching users", response);
            }
            const pChats = response.filter((u) => {
                let isChatCreated = false;
                if (user?._id === u?._id) return false;
                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return (
                            chat.members[0] === u?._id ||
                            chat.members[1] === u?._id
                        );
                    });
                }
                return !isChatCreated;
            });
            setPotentialChats(pChats);
        };
        getUser();
    }, [user, userChats]);

    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(
            `${baseUrl}/chats`,
            JSON.stringify({
                firstId,
                secondId,
            })
        );
        if (response.error) {
            return console.log("Error creating chat", response);
        }
        setUserChats((prev) => [...prev, response]);
    }, []);

    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setUserChatsLoading(true);
                setUserChatsError(null);
                const response = await getRequest(
                    `${baseUrl}/chats/${user?._id}`
                );
                setUserChatsLoading(false);
                if (response.error) {
                    return setUserChatsError(response);
                }
                setUserChats(response);
            }
        };
        getUserChats();
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {
            if (user?._id) {
                setIsMessagesLoading(true);
                setMessagesError(null);
                const response = await getRequest(
                    `${baseUrl}/messages/${currentChat?._id}`
                );
                setIsMessagesLoading(false);
                if (response.error) {
                    return setMessageError(response);
                }
                setMessages(response);
            }
        };
        getMessages();
    }, [currentChat]);

    const sendTextMessage = useCallback(
        async (textMessage, sender, currentChatId, setTextMessage) => {
            if (!textMessage) return console.log("You must type something ...");
            const response = await postRequest(
                `${baseUrl}/messages`,
                JSON.stringify({
                    chatId: currentChatId,
                    senderId: sender._id,
                    text: textMessage,
                })
            );
            if (response.error) {
                return SetSendTextMessageError(response);
            }
            setMessages((prev) => [...prev, response]);
            setTextMessage("");
        },
        []
    );

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);
    return (
        <ChatContext.Provider
            value={{
                userChats,
                isUserChatsLoading,
                userChatsError,
                potentialChats,
                createChat,
                updateCurrentChat,
                isMessagesLoading,
                messagesError,
                messages,
                currentChat,
                sendTextMessage,
                onlineUsers,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
