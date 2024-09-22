import React, { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import '../scss/hero.scss';
import backgroundPic from '../assets/background/hero-back.png';

const Hero: React.FC = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="hero" id="hero">
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className="title">Your Dream Home Awaits, Let’s Find It Together!</h1>
                    <div className="imgContainer img-1">
                        <img src={backgroundPic} alt="Background" />
                    </div>
                    <p>
                        Specializing in finding your dream home, we offer personalized service
                        and expert knowledge, making your real estate journey seamless, enjoyable,
                        and tailored to your needs.
                    </p>
                    <SearchBar />
                    <div className="boxes">
                        <div className="box">
                            <h1>20+</h1>
                            <h2>Years of Experience</h2>
                        </div>
                        <div className="box">
                            <h1>1500+</h1>
                            <h2>Property Ready</h2>
                        </div>
                        <div className="box">
                            <h1>30</h1>
                            <h2>Award Gained</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="imgContainer img-2">
                <img src={backgroundPic} alt="Background" />
            </div>
        </div>
    );
};

export default Hero;