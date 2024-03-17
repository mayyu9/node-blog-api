const express = require('express');

const { handleGetAllBlogs, handleGetBlogById, handleCreateBlogs } = require('../controllers/blog');
const { ensureAuthenticated } = require('../middlewares/blogs')
const router = express.Router();
const Blog = require('../models/blog')

// public route
// unprotected route user without token can also be able to access it
router.get('/', handleGetAllBlogs);

// public route
// unprotected route user without token can also be able to access it
router.get('/:id', handleGetBlogById);

// protected route
// protected route user with token can also be able to access it
router.post('/', ensureAuthenticated, handleCreateBlogs);

// protected route + Authorization token required
// protected route user with token can also be able to access it
router.patch('/:id', ensureAuthenticated);

// protected route + Authorization token required
// protected route user with token can also be able to access it
router.delete('/:id', ensureAuthenticated, async(req, res) => {
    const blogToDelete = await Blog.findById(req.params.id)

    if (blogToDelete.createdBy == req.user._id) {
        await Blog.findByIdAndDelete(req.params.id)
    }

    return res.redirect('/')
});

module.exports = router;