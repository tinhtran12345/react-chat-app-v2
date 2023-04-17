import React, { memo, useContext } from "react";
import useFetchRecipientUser from "../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import profile from "../assets/profiled.svg";
import { ChatContext } from "../context/ChatContext";

const UserChat = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipientUser(chat, user);
    // console.log(recipientUser);
    const { onlineUsers } = useContext(ChatContext);
    const isOnline = onlineUsers?.some(
        (user) => user?.userId === recipientUser?._id
    );
    return (
        <Stack
            direction="horizontal"
            gap={3}
            className="user-card align-items-center p-2 justify-content-between"
            role="button"
        >
            <div className="d-flex align-items-center justify-content-between">
                <div className="me-2">
                    <img
                        src={profile}
                        alt=""
                        style={{ width: 40, height: 40 }}
                        className="object-fit-cover border border-primary rounded-circle"
                    />
                </div>
                <div className="text-content ">
                    <div className="name">{recipientUser?.name}</div>
                    <div className="text"> Text Message</div>
                </div>
            </div>
            <div className=" text-content d-flex flex-column align-items-end">
                <div className="date">12/12/2022</div>
                <div className="this-user-notifications">2</div>
                <div className={isOnline ? "user-online" : ""}></div>
            </div>
        </Stack>
    );
};

export default memo(UserChat);
