import React, { useState, useEffect } from 'react';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import postService from '../services/postService';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postService.getAllPosts().then((data) => {
            setPosts(data);
        });
    }, []);

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <div className="social-share">
                        <FacebookShareButton url={`http://localhost:3000/posts/${post.id}`}>
                            Share on Facebook
                        </FacebookShareButton>
                        <TwitterShareButton url={`http://localhost:3000/posts/${post.id}`}>
                            Share on Twitter
                        </TwitterShareButton>
                        <LinkedinShareButton url={`http://localhost:3000/posts/${post.id}`}>
                            Share on LinkedIn
                        </LinkedinShareButton>
                    </div>
                </div>
            ))}
        </div>
    );
};
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        postService.getAllPosts(page).then((data) => {
            setPosts(data);
        });
    }, [page]);

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <button onClick={() => setPage(page + 1)}>
                    Next
                </button>
            </div>
        </div>
    );


export default PostList;
