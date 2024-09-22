import React from 'react';
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Footer from "../components/Footer";

const Home: React.FC = () => {
    return (
        <div className="home">
            <Hero />
            <About />
            <Services />
            <Footer />
        </div>
    );
};

export default Home;