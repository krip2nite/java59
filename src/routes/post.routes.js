import express from 'express'
import postController from '../controller/post.controller.js'
import validate from "../middleware/validation.middleware.js";

const router = express.Router()

router.post('/post/:author', validate('createPost') ,postController.createPost);
router.get('/post/:id', postController.getPostById);
router.patch('/post/:id/like', postController.addLike);
router.get('/posts/author/:author', postController.getPostByAuthor);
router.patch('/post/:id/comment/:commenter', validate('addComment'), postController.addComment);
router.delete('/post/:id', postController.deletePost);
router.get('/posts/tags', postController.getPostsByTags);
router.get('/posts/period',validate('datePeriod'), postController.getPostsByPeriod);
router.patch('/post/:id', validate('updatePost'), postController.updatePost);


export default router;