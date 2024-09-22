import { useContext, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiRequest from "../utils/apiRequest";
import UploadWidget from "../components/UploadWidget";
import "../scss/profileupdate.scss";
import avatarPic from "../assets/images/noavatar.jpg";

interface User {
    id: number;
    username: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    currentUser: User;
    updateUser: (user: User) => void;
}

function ProfileUpdate() {
    const { currentUser, updateUser } = useContext(AuthContext) as AuthContextType;
    const [error, setError] = useState<string>("");
    const [avatar, setAvatar] = useState<string[]>([]);
    const navigate = useNavigate();

    const toastOptions: ToastOptions = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const { username, email, password } = Object.fromEntries(formData) as {
            username: string;
            email: string;
            password: string;
        };

        try {
            const res = await apiRequest.put(`/users/${currentUser.id}`, {
                username,
                email,
                password,
                avatar: avatar[0]
            });

            updateUser(res.data);
            toast.success("Profile updated successfully!", toastOptions);
            navigate("/profile");
        }
        catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "An error occurred.");
            toast.error("Failed to update profile. Please try again.", toastOptions);
        }
    };

    return (
        <div className="profileupdate">
            <ToastContainer />
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Update Profile</h1>
                    <div className="item">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            defaultValue={currentUser.username}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={currentUser.email}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" />
                    </div>
                    <button type="submit">Update</button>
                    {error && <span>{error}</span>}
                </form>
            </div>
            <div className="sideContainer">
                <img src={avatar[0] || currentUser.avatar || avatarPic} alt="" className="avatar" />
                <UploadWidget
                    uwConfig={{
                        cloudName: "dvwkhvavi",
                        uploadPreset: "Real Estate",
                        multiple: false,
                        maxImageFileSize: 2000000,
                        folder: "avatars",
                    }}
                    setState={setAvatar}
                    setPublicId={(publicId: string) => { /* handle publicId */ }} />
            </div>
        </div>
    );
}

export default ProfileUpdate;