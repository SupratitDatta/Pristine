import React from 'react';
import Card from './Card';
import '../scss/list.scss';

interface Post {
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

interface ListProps {
    posts: Post[];
}

const List: React.FC<ListProps> = ({ posts }) => {
    return (
        <div className='list'>
            {posts.map(item => (
                <Card key={item.id} item={item} />
            ))}
        </div>
    );
};

export default List;