import React, { useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import postService from '../services/postService';

const PostEditor = () => {
    const [tags, setTags] = useState([]);

    const handleTagChange = (e) => {
        const value = e.target.value.split(',').map(tag => tag.trim());
        setTags(value);
    };

    const handleSubmit = async (content) => {
        const title = prompt("Enter the post title:");
        await postService.createPost({ title, content, tags });
        alert("Post created successfully!");
    };

    return (
        <div>
            <h1>Create a New Post</h1>
            <input
                type="text"
                placeholder="Enter tags separated by commas"
                onChange={handleTagChange}
            />
            <MarkdownEditor onSubmit={handleSubmit} />
        </div>
    );
};

export default PostEditor;
