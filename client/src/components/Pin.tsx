import React from "react";
import { Link } from "react-router-dom";
import { Marker, Popup } from "react-leaflet";
import "../scss/pin.scss";

interface Item {
    id: string;
    latitude: number;
    longitude: number;
    images: string[];
    title: string;
    bedroom: number;
    price: number;
}

interface PinProps {
    item: Item;
}

const Pin: React.FC<PinProps> = ({ item }) => {
    return (
        <Marker position={[item.latitude, item.longitude]}>
            <Popup>
                <div className="popupContainer">
                    <img src={item.images[0]} alt={item.title} />
                    <div className="textContainer">
                        <Link to={`/${item.id}`}>{item.title}</Link>
                        <span>{item.bedroom} bedroom</span>
                        <b>Rs {item.price}</b>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export default Pin;