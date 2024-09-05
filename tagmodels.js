const { Pool } = require('pg');
const pool = new Pool();

const createTag = async (name) => {
    const result = await pool.query('INSERT INTO tags (name) VALUES ($1) RETURNING *', [name]);
    return result.rows[0];
};

const getTagsByPost = async (postId) => {
    const result = await pool.query(
        'SELECT t.* FROM tags t JOIN post_tags pt ON t.id = pt.tag_id WHERE pt.post_id = $1',
        [postId]
    );
    return result.rows;
};

module.exports = {
    createTag,
    getTagsByPost
};
