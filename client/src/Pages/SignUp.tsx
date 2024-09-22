import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../utils/apiRequest";
import "../scss/signup.scss";
import backgroundPic from "../assets/background/signin-back.png";

const SignUp: React.FC = () => {
    const [error, setError] = useState < string > ("");
    const [isLoading, setIsLoading] = useState < boolean > (false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const res = await apiRequest.post("/auth/register", {
                username,
                email,
                password,
            });

            navigate("/login");
        } 
        catch (err: any) {
            setError(err.response?.data?.message || "An error occurred");
        } 
        finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Create an Account</h1>
                    <input name="username" type="text" placeholder="Username" required />
                    <input name="email" type="email" placeholder="Email" required />
                    <input name="password" type="password" placeholder="Password" required />
                    <button disabled={isLoading}>SignUp</button>
                    {error && <span>{error}</span>}
                    <Link to="/login" className="link">
                        Do you have an account? <span className="option">Sign-In</span>
                    </Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src={backgroundPic} alt="Sign-In Background" />
            </div>
        </div>
    );
};

export default SignUp;