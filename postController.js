const tagModel = require('../models/tagModel');

const createPost = async (req, res) => {
    const post = await postModel.createPost(req.body);

    // Handle tags
    const { tags } = req.body;
    if (tags && tags.length > 0) {
        for (let tag of tags) {
            await tagModel.createTag(tag);
        }
    }

    res.status(201).json(post);
};
const getAllPosts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const posts = await postModel.getPaginatedPosts(page, limit);
    res.json(posts);
};

