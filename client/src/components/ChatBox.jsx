import React, { memo, useContext, useState } from "react";
import useFetchRecipientUser from "../hooks/useFetchRecipient";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Loading from "./Loading";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading, sendTextMessage } =
        useContext(ChatContext);
    const [textMessage, setTextMessage] = useState("");
    const { recipientUser } = useFetchRecipientUser(currentChat, user);
    // console.log(messages);
    // console.log(user);
    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center position-relative"
            style={{ textAlign: "center", width: "100%" }}
        >
            {!recipientUser && (
                <p style={{ textAlign: "center", width: "100%" }}>
                    No conversation selected yet
                </p>
            )}
            {isMessagesLoading && (
                <div className="loading-box">
                    <Loading text={"Loading chat..."} />
                </div>
            )}

            <Stack gap={4} className="chat-box">
                <div className="chat-header">
                    <strong>{recipientUser?.name}</strong>
                </div>
                <Stack gap={3} className="messages">
                    {messages?.length > 0 &&
                        messages?.map((content, index) => (
                            <Stack
                                key={index}
                                className={`${
                                    content?.senderId === user?._id
                                        ? "message self align-self-end flex-grow-0 text-start"
                                        : "message align-self-start flex-grow-0 text-start"
                                }`}
                            >
                                <span className="text-message">
                                    {content?.text}
                                </span>
                                <span className="date-message">
                                    {moment(content?.createdAt).calendar()}
                                </span>
                            </Stack>
                        ))}
                </Stack>
                <Stack
                    direction="horizontal"
                    gap={3}
                    className="flex-grow-0 chat-input"
                >
                    <InputEmoji
                        value={textMessage}
                        onChange={setTextMessage}
                        fontFamily="nunito"
                        borderColor="rgba(71,z"
                    />
                    <button
                        className="send-btn"
                        onClick={() =>
                            sendTextMessage(
                                textMessage,
                                user,
                                currentChat._id,
                                setTextMessage
                            )
                        }
                    >
                        Send
                    </button>
                </Stack>
            </Stack>
        </div>
    );
};

export default memo(ChatBox);
