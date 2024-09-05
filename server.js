const express = require('express');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
