import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../scss/navbar.scss";
import menuPic from "../assets/icons/menu.png";
import logoPic from "../assets/main/logo.png";
import avatarPic from "../assets/images/noavatar.jpg";

interface User {
    avatar?: string;
    username: string;
}

const Navbar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const { currentUser, logout } = useContext(AuthContext) as { currentUser: User | null; logout: () => void };
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsSticky(true);
            }
            else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollToSection = (id: string) => {
        if (id === "hero") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        else {
            const section = document.getElementById(id);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const goToProfile = () => {
        navigate("/profile");
    }

    return (
        <nav className={isSticky ? "sticky" : ""}>
            <div className="left">
                <Link to="/" className="logo">
                    <img src={logoPic} alt="logo" />
                    <span>PRISTINE</span>
                </Link>
                <span className="nav-item" onClick={() => handleScrollToSection("hero")}>Home</span>
                <span className="nav-item" onClick={() => handleScrollToSection("about")}>About</span>
                <span className="nav-item" onClick={() => handleScrollToSection("services")}>Services</span>
                <span className="nav-item" onClick={() => handleScrollToSection("contact")}>Contact Us</span>
            </div>
            <div className="right">
                {currentUser ? (
                    <div className="user">
                        <div onClick={goToProfile}><img src={currentUser.avatar || avatarPic} alt="avatar" /></div>
                        <span className="username">{currentUser.username}</span>
                        <Link to="/profile" className="profile">
                            <span>PROFILE</span>
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="log-in">Sign in</Link>
                        <Link to="/signup" className="register">Sign up</Link>
                    </>
                )}
                <div className="menuIcon">
                    <img src={menuPic} alt="menu icon"
                        onClick={() => setOpen(prev => !prev)}
                    />
                </div>
            </div>

            <div className={`side-menu ${open ? "open" : ""}` + `${isSticky ? " sticky" : ""}`}>
                <ul className="small-scr">
                    {currentUser ? (
                        <div className="user">
                            <div onClick={() => { goToProfile(); setOpen(prev => !prev); }} className="profile">
                                <span>PROFILE</span>
                            </div>

                        </div>
                    ) : (
                        <>
                            <div onClick={() => { navigate("/login"); setOpen(prev => !prev); }} className="log-in">Sign in</div>
                            <div onClick={() => { navigate("/signup"); setOpen(prev => !prev); }} className="register">Sign up</div>
                        </>
                    )}
                    <span className="nav-item" onClick={() => { handleScrollToSection("hero"); setOpen(prev => !prev); }}>Home</span>
                    <span className="nav-item" onClick={() => { handleScrollToSection("about"); setOpen(prev => !prev); }}>About</span>
                    <span className="nav-item" onClick={() => { handleScrollToSection("services"); setOpen(prev => !prev); }}>Services</span>
                    <span className="nav-item" onClick={() => { handleScrollToSection("contact"); setOpen(prev => !prev); }}>Contact Us</span>
                </ul>
            </div>
            {open && <div className="overlay" onClick={() => setOpen(false)} />}
        </nav>
    );
};

export default Navbar;