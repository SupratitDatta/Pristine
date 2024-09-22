import { useState } from "react";
import "../scss/slider.scss";
import arrowPic from "../assets/icons/arrow.png";
import alternate from "../assets/images/common.jpg"

interface SliderProps {
    images: string[];
}

function Slider({ images }: SliderProps) {
    const [imageIndex, setImageIndex] = useState<number | null>(null);

    const changeSlide = (direction: "left" | "right") => {
        if (direction === "left") {
            setImageIndex((prevIndex) =>
                (prevIndex ?? 0) === 0 ? images.length - 1 : (prevIndex ?? 0) - 1
            );
        }
        else {
            setImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : (prevIndex ?? 0) + 1
            );
        }
    };

    return (
        <div className="slider">
            {imageIndex !== null && (
                <div className="fullSlider">
                    <div className="arrow" onClick={() => changeSlide("left")}>
                        <img src={arrowPic} alt="Previous" />
                    </div>
                    <div className="imgContainer">
                        <img src={images[imageIndex] || alternate} alt="Slide" />
                    </div>
                    <div className="arrow" onClick={() => changeSlide("right")}>
                        <img src={arrowPic} className="right" alt="Next" />
                    </div>
                    <div className="close" onClick={() => setImageIndex(null)}>
                        X
                    </div>
                </div>
            )}
            <div className="bigImage">
                <img src={images[0] || alternate} alt="Thumbnail" onClick={() => setImageIndex(0)} />
            </div>
            <div className="smallImages">
                {images.slice(1).map((image, index) => (
                    <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        key={index}
                        onClick={() => setImageIndex(index + 1)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Slider;