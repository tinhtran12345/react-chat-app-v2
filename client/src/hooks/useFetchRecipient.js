import React, { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../services/service";

const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);
    const recipientId = chat?.members.find((id) => id !== user?._id);
    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null;
            const response = await getRequest(
                `${baseUrl}/users/find/${recipientId}`
            );
            if (response.error) {
                return setError(error);
            }
            setRecipientUser(response);
        };
        getUser();
    }, [recipientId]);
    return { recipientUser, error };
};

export default useFetchRecipientUser;
