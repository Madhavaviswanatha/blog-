const { Pool } = require('pg');
const pool = new Pool();

const getAllPosts = async () => {
    const result = await pool.query('SELECT * FROM posts');
    return result.rows;
};

const createPost = async (post) => {
    const result = await pool.query(
        'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
        [post.title, post.content]
    );
    return result.rows[0];
};

module.exports = {
    getAllPosts,
    createPost
};
const getPaginatedPosts = async (page, limit) => {
    const offset = (page - 1) * limit;
    const result = await pool.query('SELECT * FROM posts LIMIT $1 OFFSET $2', [limit, offset]);
    return result.rows;
};

module.exports = {
    getAllPosts,
    getPaginatedPosts,
    createPost
};

