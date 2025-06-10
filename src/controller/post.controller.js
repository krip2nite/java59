import postService from "../services/post.service.js";

class PostController {
    async createPost(req, res, next) {
        try{
        const post = await postService.createPost(req.params.author, req.body);
        res.status(201).json(post)
        }catch(err){
            next(err);
        }
    }

    async getPostById(req, res, next) {
        try{
            const post = await postService.getPostById(req.params.id);
            res.json(post)
        }catch(err){
            next(err);
        }
    }

    async addLike(req, res, next) {
        try {
            await postService.addLike(req.params.id);
            res.sendStatus(204)
        }catch (err){
            next(err);
        }
    }

    async getPostByAuthor(req, res, next) {
        try {
            const posts = await postService.getPostByAuthor(req.params.author);
            res.json(posts)
        }catch (err){
            next(err);
        }
    }
    async addComment(req, res, next) {
        try {
            const post = await postService.addComment(req.params.id, req.params.commenter, req.body.message);
            res.json(post);
        } catch (err) {
            next(err);
        }
    }
    async deletePost(req, res, next) {
        try {
            const post = await postService.deletePost(req.params.id);
            res.json(post);
        } catch (err) {
            next(err);
        }
    }
    async getPostsByTags(req, res, next) {
        try {
            let tags;
            if (req.query.values) {
                if (Array.isArray(req.query.values)) {
                    tags = req.query.values;
                }
                else {
                    tags = [req.query.values];
                }
            }
            else {
                tags = [];
            }
            const posts = await postService.getPostsByTags(tags);
            res.json(posts);
        } catch (err) {
            next(err);
        }
    }
    async getPostsByPeriod(req, res, next) {
        try {
            const {dateFrom, dateTo} = req.query;
            const posts = await postService.getPostsByPeriod(dateFrom, dateTo);
            res.json(posts);
        } catch (err) {
            next(err);
        }
    }
    async updatePost(req, res, next) {
        try {
            const post = await postService.updatePost(req.params.id, req.body);
            res.json(post);
        } catch (err) {
            next(err);
        }
    }
}

export default new PostController();