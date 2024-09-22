import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../utils/apiRequest";
import UploadWidget from "../components/UploadWidget";
import "../scss/newpost.scss";

interface PostDetail {
    desc: string;
    utilities: string;
    pet: string;
    income: string;
    size: number;
    school: number;
    bus: number;
    restaurant: number;
}

interface PostData {
    title: string;
    price: number;
    address: string;
    city: string;
    bedroom: number;
    bathroom: number;
    type: 'rent' | 'buy';
    property: 'apartment' | 'house' | 'condo' | 'land';
    latitude: string;
    longitude: string;
    images: string[];
}

function NewPost() {
    const [value, setValue] = useState<string>("");
    const [images, setImages] = useState<string[]>([]);
    const [error, setError] = useState<string>(""); 
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const inputs = Object.fromEntries(formData.entries());

        const postData: PostData = {
            title: inputs.title as string,
            price: parseInt(inputs.price as string),
            address: inputs.address as string,
            city: inputs.city as string,
            bedroom: parseInt(inputs.bedroom as string),
            bathroom: parseInt(inputs.bathroom as string),
            type: inputs.type as 'rent' | 'buy',
            property: inputs.property as 'apartment' | 'house' | 'condo' | 'land',
            latitude: inputs.latitude as string,
            longitude: inputs.longitude as string,
            images: images
        };

        const postDetail: PostDetail = {
            desc: value,
            utilities: inputs.utilities as string,
            pet: inputs.pet as string,
            income: inputs.income as string,
            size: parseInt(inputs.size as string),
            school: parseInt(inputs.school as string),
            bus: parseInt(inputs.bus as string),
            restaurant: parseInt(inputs.restaurant as string)
        };

        try {
            const res = await apiRequest.post("/posts", {
                postData,
                postDetail,
            });
            navigate("/" + res.data.id);
        } catch (err) {
            console.log(err);
            setError("An error occurred while submitting the form.");
        }
    };

    return (
        <div className="newpost">
            <div className="formContainer">
                <h1>Add New Post</h1>
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="item">
                            <label htmlFor="title">Title</label>
                            <input id="title" name="title" type="text" required />
                        </div>
                        <div className="item">
                            <label htmlFor="price">Price</label>
                            <input id="price" name="price" type="number" required />
                        </div>
                        <div className="item">
                            <label htmlFor="address">Address</label>
                            <input id="address" name="address" type="text" required />
                        </div>
                        <div className="item description">
                            <label htmlFor="desc">Description</label>
                            <ReactQuill theme="snow" onChange={setValue} value={value} />
                        </div>
                        <div className="item">
                            <label htmlFor="city">City</label>
                            <input id="city" name="city" type="text" required />
                        </div>
                        <div className="item">
                            <label htmlFor="bedroom">Bedroom Number</label>
                            <input min={1} id="bedroom" name="bedroom" type="number" required />
                        </div>
                        <div className="item">
                            <label htmlFor="bathroom">Bathroom Number</label>
                            <input min={1} id="bathroom" name="bathroom" type="number" required />
                        </div>
                        <div className="item">
                            <label htmlFor="latitude">Latitude</label>
                            <input id="latitude" name="latitude" type="text" required />
                        </div>
                        <div className="item">
                            <label htmlFor="longitude">Longitude</label>
                            <input id="longitude" name="longitude" type="text" required />
                        </div>
                        <div className="item">
                            <label htmlFor="type">Type</label>
                            <select name="type" required>
                                <option value="rent" defaultChecked>Rent</option>
                                <option value="buy">Buy</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="property">Property</label>
                            <select name="property" required>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="condo">Condo</option>
                                <option value="land">Land</option>
                            </select>
                        </div>

                        <div className="item">
                            <label htmlFor="utilities">Utilities Policy</label>
                            <select name="utilities" required>
                                <option value="owner">Owner is responsible</option>
                                <option value="tenant">Tenant is responsible</option>
                                <option value="shared">Shared</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="pet">Pet Policy</label>
                            <select name="pet" required>
                                <option value="allowed">Allowed</option>
                                <option value="not-allowed">Not Allowed</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="income">Income Policy</label>
                            <input id="income" name="income" type="text" placeholder="Income Policy" required />
                        </div>
                        <div className="item">
                            <label htmlFor="size">Total Size (sqft)</label>
                            <input min={0} id="size" name="size" type="number" required />
                        </div>
                        <div className="item">
                            <label htmlFor="school">School</label>
                            <input min={0} id="school" name="school" type="number" required />
                        </div>
                        <div className="item">
                            <label htmlFor="bus">Bus</label>
                            <input min={0} id="bus" name="bus" type="number" required />
                        </div>
                        <div className="item">
                            <label htmlFor="restaurant">Restaurant</label>
                            <input min={0} id="restaurant" name="restaurant" type="number" required />
                        </div>
                        <button className="sendButton" type="submit">Add</button>
                        {error && <span>{error}</span>}
                    </form>
                </div>
            </div>
            <div className="sideContainer">
                {images.map((image, index) => (
                    <img src={image} key={index} alt={`uploaded-${index}`} />
                ))}
                <div className="imageupload">
                    <UploadWidget
                        uwConfig={{
                            multiple: true,
                            cloudName: "dvwkhvavi",
                            uploadPreset: "Real Estate",
                            folder: "posts",
                        }}
                        setState={setImages}
                        setPublicId={(publicId: string) => { /* handle publicId */ }} />
                </div>
            </div>
        </div>
    );
}

export default NewPost;