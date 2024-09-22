import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/about.scss';
import about from '../assets/images/about.jpg';

const About: React.FC = () => {
    return (
        <div className="about-container" id="about">
            <div className='left'>
                <div className="about-header">
                    <h1>Discover</h1>
                    <h1>Your Dream</h1>
                    <h1>Home</h1>
                    <p>Unlock the Door to Your Dream Home. Our real estate experts curate a diverse collection of premium properties that blend cutting-edge design, unparalleled amenities.</p>
                    <Link to="/list"><button>EXPLORE</button></Link>
                </div>
            </div>
            <div className='right'>
                <img src={about} alt="Team" />
            </div>
        </div>
    );
};

export default About;