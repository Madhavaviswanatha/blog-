import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/posts';

const getAllPosts = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createPost = async (newPost) => {
    const response = await axios.post(baseUrl, newPost);
    return response.data;
};

export default {
    getAllPosts,
    createPost
};
