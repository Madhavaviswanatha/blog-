import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownEditor = ({ onSubmit }) => {
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        onSubmit(content);
    };

    return (
        <div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post in Markdown..."
            />
            <button onClick={handleSubmit}>Submit Post</button>
            <h3>Preview:</h3>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
};

export default MarkdownEditor;
