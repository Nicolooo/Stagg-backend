const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
// mongoose
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
mongoose.connect(process.env.DB_URL,
{useNewUrlParser: true, useUnifiedTopology: true},()=>console.log('Db connected babu'));
app.use(express.json());
app.use('/api/user',authRoute);
app.use('/api/posts',postsRoute);
app.listen(3000,()=>console.log('Server is running on port 3000'));