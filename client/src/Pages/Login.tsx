import React, { useContext, useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../utils/apiRequest";
import { AuthContext } from "../context/AuthContext";
import "../scss/login.scss";
import backgroundPic from "../assets/background/signin-back.png";

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

const Login: React.FC = () => {
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const { updateUser } = useContext(AuthContext) as { updateUser: (user: User | null) => void };
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        try {
            const res = await apiRequest.post("/auth/login", {
                username,
                password,
            });

            updateUser(res.data);
            navigate("/");
        }
        catch (err: any) {
            setError(err.response?.data?.message || "An error occurred");
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Welcome back</h1>
                    <input
                        name="username"
                        required
                        minLength={3}
                        maxLength={20}
                        type="text"
                        placeholder="Username"
                    />
                    <input
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                    />
                    <button disabled={isLoading}>Login</button>
                    {error && <span>{error}</span>}
                    <Link to="/signup" className="link">{"Don't"} you have an account ? <span className="option">Sign-Up</span></Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src={backgroundPic} alt="Sign-In Background" />
            </div>
        </div>
    );
};

export default Login;