import React, { Suspense, useContext } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import List from "../components/List";
import Map from "../components/Map";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../utils/apiRequest";
import "../scss/profile.scss";
import avatarPic from "../assets/images/noavatar.jpg";

interface User {
    email: string;
    username: string;
    password: string;
    avatar?: string;
    createdAt: Date;
    posts: string[];
    savedPosts: string[];
    chatIDs: string[];
}

interface PostResponse {
    data: {
        userPosts: any[];
        savedPosts: any[];
    };
}

interface ChatResponse {
    data: any[];
}

interface LoaderData {
    postResponse: PostResponse;
    chatResponse: ChatResponse;
}

interface MapLoaderData {
    postResponse: PostResponse;
}

const Profile: React.FC = () => {
    const data = useLoaderData() as LoaderData;
    const mapdata = useLoaderData() as MapLoaderData;
    const { updateUser, currentUser } = useContext(AuthContext) as { updateUser: (user: User | null) => void, currentUser: User | null };
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/logout");
            updateUser(null);
            navigate("/");
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="profilePage">
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>USER DETAILS</h1>
                        <Link to="/profile/update">
                            <button>Update Profile</button>
                        </Link>
                    </div>
                    <div className="info">
                        <span>
                            <img
                                src={currentUser?.avatar || avatarPic}
                                alt="Avatar"
                                className="avatar"
                            />
                            <b className="username">{currentUser?.username}</b>
                        </span>
                        <span>
                            <b className="email">{currentUser?.email}</b>
                            <button onClick={handleLogout}>Logout</button>
                        </span>
                    </div>
                    <div className="title">
                        <h1>MY LIST</h1>
                        <Link to="/add">
                            <button>Create New Post</button>
                        </Link>
                    </div>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={<p>Error loading posts!</p>}
                        >
                            {(postResponse) => (
                                <List posts={postResponse.data.userPosts} />
                            )}
                        </Await>
                    </Suspense>
                    <div className="title">
                        <h1>SAVED LIST</h1>
                    </div>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={<p>Error loading posts!</p>}
                        >
                            {(postResponse) => (
                                <List posts={postResponse.data.savedPosts} />
                            )}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="mapContainer">
                <div className="wrapper">
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={mapdata.postResponse}
                            errorElement={<p>Error Loading Map!</p>}
                        >
                            {(postResponse) => (
                                console.log(postResponse),
                                <Map items={postResponse.data.savedPosts} />
                            )}
                        </Await>
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default Profile;