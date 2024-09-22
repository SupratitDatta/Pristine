import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Filter from "../components/Filter";
import Card from "../components/Card";
import Map from "../components/Map";
import "../scss/listPage.scss";

interface Post {
    id: string;
    _id: string;
    title: string;
    price: number;
    images: string[];
    address: string;
    city: string;
    bedroom: number;
    bathroom?: number;
    latitude: string;
    longitude: string;
    type: 'buy' | 'rent';
    property: 'apartment' | 'house' | 'condo' | 'land';
    createdAt: string;
    userId: string;
    postDetail: string;
    savedPosts: string[];
}

interface PostResponse {
    data: Post[];
}

interface LoaderData {
    postResponse: PostResponse;
}

const ListPage: React.FC = () => {
    const data = useLoaderData() as LoaderData;

    return (
        <div className="listPage">
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={<p>Error loading posts!</p>}
                        >
                            {(postResponse) =>
                                postResponse.data.map((post: Post) => {
                                    const postWithDate = { ...post, createdAt: new Date(post.createdAt) };
                                    return <Card key={post._id} item={postWithDate} />;
                                })
                            }
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="mapContainer">
                <Suspense fallback={<p>Loading...</p>}>
                    <Await
                        resolve={data.postResponse}
                        errorElement={<p>Error loading Map!</p>}
                    >
                        {(postResponse) => <Map items={postResponse.data} />}
                    </Await>
                </Suspense>
            </div>
        </div>
    );
};

export default ListPage;