const mongoose = require('mongoose');

const useSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true});

const User = mongoose.model('user', useSchema);

module.exports = User;
