import React, { memo, useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const PotentialChat = () => {
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
    const { user } = useContext(AuthContext);

    return (
        <div className="all-user">
            <h3 className="list-user">List users:</h3>
            {potentialChats.length > 0 &&
                potentialChats.map((u, index) => {
                    return (
                        <div
                            className="single-user"
                            key={index}
                            onClick={() => createChat(user._id, u._id)}
                        >
                            {u?.name}
                            <span
                                className={
                                    onlineUsers?.some(
                                        (user) => user?.userId === u?._id
                                    )
                                        ? " user-online"
                                        : ""
                                }
                            ></span>
                        </div>
                    );
                })}
        </div>
    );
};

export default memo(PotentialChat);
