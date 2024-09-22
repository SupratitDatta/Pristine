import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../scss/searchBar.scss";
import searchPic from "../assets/icons/search.png";

const types = ["buy", "rent"] as const;
type QueryType = typeof types[number];

interface Query {
    type: QueryType;
    city: string;
    minPrice: number;
    maxPrice: number;
}

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState<Query>({
        type: "buy",
        city: "",
        minPrice: 0,
        maxPrice: 0,
    });

    const switchType = (val: QueryType) => {
        setQuery((prev) => ({ ...prev, type: val }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setQuery((prev) => ({ ...prev, [name]: name === "minPrice" || name === "maxPrice" ? Number(value) : value }));
    };

    return (
        <div className="searchBar">
            <div className="type">
                {types.map((type) => (
                    <button
                        key={type}
                        onClick={() => switchType(type)}
                        className={query.type === type ? "active" : ""}
                    >
                        {type}
                    </button>
                ))}
            </div>
            <form>
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={query.city}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="minPrice"
                    min={0}
                    max={10000000}
                    placeholder="Min Price"
                    value={query.minPrice}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="maxPrice"
                    min={0}
                    max={10000000}
                    placeholder="Max Price"
                    value={query.maxPrice}
                    onChange={handleChange}
                />
                <Link
                    to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
                >
                    <button type="button">
                        <img src={searchPic} alt="Search" />
                    </button>
                </Link>
            </form>
        </div>
    );
}

export default SearchBar;