require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

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

app.listen(PORT, () => console.log('server started'))