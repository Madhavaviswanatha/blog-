import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/posts', {
                headers: {
                    Authorization: token
                }
            });
            setPosts(res.data);
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Blog Posts</h1>
            {posts.map(post => (
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>By {post.author}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;
