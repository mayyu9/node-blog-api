const express = require('express');

const { handleGetAllBlogs, handleGetBlogById, ensureAuthenticated, handleCreateBlogs } = require('../controllers/blog');

const router = express.Router();

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
router.delete('/:id', ensureAuthenticated);