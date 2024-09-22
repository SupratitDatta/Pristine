import { useContext, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../utils/apiRequest";
import Slider from "../components/Slider";
import Map from "../components/Map";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastOptions } from "react-toastify";
import "../scss/singlepost.scss";
import { utilityPic, pinPic, petPic, feePic, sizePic, bedPic, bathPic, schoolPic, chatPic, savePic, busPic } from "../assets/icons/icons";

interface PostDetail {
    desc: string;
    utilities: string;
    pet: string;
    income: string;
    size: number;
    school: number;
    bus: number;
    restaurant: number;
    postId: string;
}

interface User {
    id: number;
    username: string;
    avatar: string;
}

interface Post {
    id: string;
    title: string;
    address: string;
    price: number;
    bedroom: number;
    bathroom: number;
    isSaved: boolean;
    images: string[];
    user: User;
    postDetail: PostDetail;
}

interface AuthContextType {
    currentUser: User | null;
}

function SinglePost() {
    const post = useLoaderData() as Post;
    const [saved, setSaved] = useState<boolean>(post.isSaved);
    const { currentUser } = useContext(AuthContext) as AuthContextType;
    const navigate = useNavigate();

    const toastOptions: ToastOptions = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    };

    const handleSave = async () => {
        if (!currentUser) {
            navigate("/login");
            return;
        }

        const newSavedState = !saved;
        setSaved(newSavedState);

        try {
            const response = await apiRequest.post("/users/save", { postId: post.id });

            if (response.status === 200) {
                toast.success(newSavedState ? "Post saved!" : "Post removed from saved list", toastOptions);
            }
            else {
                throw new Error("Failed to update save status");
            }
        }
        catch (err) {
            console.error("Error saving post:", err);
            setSaved(!newSavedState);
            toast.error("Failed to save the post. Please try again.", toastOptions);
        }
    };

    return (
        <div className="singlepost">
            <ToastContainer />
            <div className="details">
                <div className="wrapper">
                    <Slider images={post.images} />
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{post.title}</h1>
                                <span className="feasibility">
                                    <div className="address">
                                        <img src={pinPic} alt="Location icon" />
                                        <span>{post.address}</span>
                                    </div>
                                    <div className="price">Rs {post.price}</div>
                                </span>
                            </div>
                            <div className="user">
                                <img src={post.user.avatar} alt="User avatar" />
                                <span>{post.user.username}</span>
                            </div>
                        </div>
                        <div
                            className="bottom"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(post.postDetail.desc),
                            }}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="features">
                <div className="wrapper">
                    <p className="title">General</p>
                    <div className="listVertical">
                        <div className="feature">
                            <img src={utilityPic} alt="Utility icon" />
                            <div className="featureText">
                                <span>Utilities</span>
                                {post.postDetail.utilities === "owner" ? (
                                    <p>Owner is responsible</p>
                                ) : (
                                    <p>Tenant is responsible</p>
                                )}
                            </div>
                        </div>
                        <div className="feature">
                            <img src={petPic} alt="Pet policy icon" />
                            <div className="featureText">
                                <span>Pet Policy</span>
                                {post.postDetail.pet === "allowed" ? (
                                    <p>Pets Allowed</p>
                                ) : (
                                    <p>Pets not Allowed</p>
                                )}
                            </div>
                        </div>
                        <div className="feature">
                            <img src={feePic} alt="Income policy icon" />
                            <div className="featureText">
                                <span>Income Policy</span>
                                <p>{post.postDetail.income}</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Specifications</p>
                    <div className="sizes">
                        <div className="size">
                            <img src={sizePic} alt="Size icon" />
                            <span>{post.postDetail.size} sqft</span>
                        </div>
                        <div className="size">
                            <img src={bedPic} alt="Bed icon" />
                            <span>{post.bedroom} beds</span>
                        </div>
                        <div className="size">
                            <img src={bathPic} alt="Bath icon" />
                            <span>{post.bathroom} bathroom</span>
                        </div>
                    </div>
                    <p className="title">Nearby Commodities</p>
                    <div className="listHorizontal">
                        <div className="feature small-feature">
                            <img src={schoolPic} alt="School icon" />
                            <div className="featureText">
                                <span>School</span>
                                <p>
                                    {post.postDetail.school > 999
                                        ? (post.postDetail.school / 1000).toFixed(1) + " km"
                                        : post.postDetail.school + " m"}{" "}
                                    away
                                </p>
                            </div>
                        </div>
                        <div className="feature small-feature">
                            <img src={busPic} alt="Bus stop icon" />
                            <div className="featureText">
                                <span>Bus Stop</span>
                                <p>{post.postDetail.bus} m away</p>
                            </div>
                        </div>
                        <div className="feature small-feature">
                            <img src={feePic} alt="Restaurant icon" />
                            <div className="featureText">
                                <span>Restaurant</span>
                                <p>{post.postDetail.restaurant} m away</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Location</p>
                    <div className="mapContainer">
                        <Map items={[post]} />
                    </div>
                    <div className="buttons">
                        <button>
                            <img src={chatPic} alt="Chat icon" />
                            Send a Message
                        </button>
                        <button
                            onClick={handleSave}
                            style={{
                                backgroundColor: saved ? "#fece51" : "white",
                            }}
                        >
                            <img src={savePic} alt="Save icon" />
                            {saved ? "Place Saved" : "Save the Place"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SinglePost;