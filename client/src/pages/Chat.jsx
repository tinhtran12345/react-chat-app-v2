import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import { ChatBox, Loading, PotentialChat, UserChat } from "../components";
import { AuthContext } from "../context/AuthContext";

const Chat = () => {
    const { user } = useContext(AuthContext);
    const { userChats, isUserChatsLoading, updateCurrentChat } =
        useContext(ChatContext);
    return (
        <Container>
            <PotentialChat />
            {userChats?.length < 1 ? null : (
                <Stack
                    direction="horizontal"
                    gap={4}
                    className="align-items-start"
                >
                    <Stack className="messages-box flex-grow-0 pe-3 " gap={3}>
                        {isUserChatsLoading && (
                            <div className="loading-box">
                                <Loading text={"Loading chats..."} />
                            </div>
                        )}
                        {userChats?.map((chat, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => updateCurrentChat(chat)}
                                >
                                    <UserChat chat={chat} user={user} />
                                </div>
                            );
                        })}
                    </Stack>
                    <ChatBox />
                </Stack>
            )}
        </Container>
    );
};

export default Chat;
