import { defer, LoaderFunctionArgs } from "react-router-dom";
import apiRequest from "./apiRequest";

type PostResponse = any;
type ChatResponse = any;

export const singlePageLoader = async ({ request, params }: LoaderFunctionArgs): Promise<PostResponse> => {
    const res = await apiRequest(`/posts/${params.id}`);
    return res.data;
};

export const listPageLoader = async ({ request }: LoaderFunctionArgs) => {
    const query = request.url.split("?")[1];
    const postPromise = apiRequest(`/posts?${query}`);
    return defer({
        postResponse: postPromise,
    });
};

export const profilePageLoader = async () => {
    const postPromise = apiRequest("/users/profilePosts");
    const chatPromise = apiRequest("/chats");
    return defer({
        postResponse: postPromise,
        chatResponse: chatPromise,
    });
};