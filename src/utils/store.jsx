import axios from "axios";
import { setConversations } from "./conversationsSlice";
import { BASE_URL } from "./constants";

// Fetch conversations based on the type (user-user or expert-user)
export const fetchConversations = (type) => async (dispatch) => {
    try {
        const res = await axios.get(`${BASE_URL}/conversations`, {
            withCredentials: true,
            params: { type },  // Passing type as a query parameter
        });
        dispatch(setConversations(res.data));
    } catch (error) {
        console.error("Failed to fetch conversations:", error);
    }
};
