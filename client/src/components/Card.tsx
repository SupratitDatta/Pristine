import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/card.scss';
import { pinPic, bedPic, bathPic, savePic } from '../assets/icons/icons';
import common from '../assets/images/common.jpg';


interface CardProps {
    item: CardItem;
}

interface CardItem {
    id: string;
    title: string;
    price: number;
    images?: string[];
    address: string;
    city: string;
    bedroom: number;
    bathroom?: number;
    latitude: string;
    longitude: string;
    type?: 'buy' | 'rent';
    property?: 'apartment' | 'house' | 'condo' | 'land';
    createdAt?: Date;
    userId?: string;
    postDetail?: string;
    savedPosts?: string[];
}

interface CardProps {
    item: CardItem;
}

const Card: React.FC<CardProps> = ({ item }) => {
    return (
        <div className="card">
            <Link to={`/${item.id}`} className="imageContainer">
                <img src={item.images?.[0] || common} alt="Property" />
            </Link>
            <div className="textContainer">
                <h2 className="title">
                    <Link to={`/${item.id}`}>{item.title}</Link>
                </h2>
                <p className="address">
                    <img src={pinPic} alt="Location" />
                    <span>{item.address}</span>
                </p>
                <p className="price">$ {item.price}</p>
                <div className="bottom">
                    <div className="features">
                        <div className="feature">
                            <img src={bedPic} alt="Bedroom" />
                            <span>{item.bedroom} bedroom</span>
                        </div>
                        <div className="feature">
                            <img src={bathPic} alt="Bathroom" />
                            <span>{item.bathroom} bathroom</span>
                        </div>
                    </div>
                    <div className="icons">
                        <div className="icon">
                            <img src={savePic} alt="Save" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;