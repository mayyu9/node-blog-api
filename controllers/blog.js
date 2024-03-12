const Blogs = require('../models/blog');

exports.handleGetAllBlogs = async (req, res) => {
    const blogs = await Blogs.find({});
    return res.json({data: blogs});
};

exports.handleGetBlogById = async (req, res) => {
    const id =  req.params.id;
    const blogs = await Blogs.find({});
    return res.json({data: blogs});
};

exports.handleCreateBlogs = async (req, res) => {
    const { title, body} = req.body;
    const userId = req.user._id; // get user id 

    const blog = await Blog.create({ title, body, createdBy: userId});

    return res.json({status: 'success', data: {id: blog._id}})
}

exports.handleCreateBlogs = async (req, res) => {
    const { title, body} = req.body;
    const userId = req.user._id; // get user id 

    const blog = await Blog.create({ title, body, createdBy: userId});

    return res.json({status: 'success', data: {id: blog._id}})
}