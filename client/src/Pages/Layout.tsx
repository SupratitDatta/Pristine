import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "../scss/layout.scss";

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

interface AuthContextType {
    currentUser: User | null;
}

function Layout() {
    return (
        <div className="layout">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

function RequireAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        return <Navigate to="/login" />;
    }
    const { currentUser } = context;

    if (!currentUser) return <Navigate to="/login" />;
    else {
        return (
            <div className="layout">
                <div className="navbar">
                    <Navbar />
                </div>
                <div className="content">
                    <Outlet />
                </div>
            </div>
        );
    }
}

export { Layout, RequireAuth };