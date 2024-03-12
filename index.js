require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const { checkForAuthentication } = require('./middlewares/auth');

const authRouter = require('./routes/auth'); 
const blogRouter = require('./routes/blog')

const app = express();
const PORT = 8000;
const url = process.env.MONGOOSE_URL;

mongoose.connect(url)
.then(() => {
    console.log('mongo db connected');
}).catch( (err) => {
    console.log('connection error: ',err);
})

app.use(express.json());
app.use(checkForAuthentication);

app.use('/auth', authRouter);
app.use('/blog', blogRouter);

app.listen(PORT, () => console.log('server started'))