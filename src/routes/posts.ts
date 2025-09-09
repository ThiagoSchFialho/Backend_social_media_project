import { Request, Response } from 'express';
var express = require('express');
var router = express.Router();

import { PostsModel } from '../models/posts.model';
const postsModel = new PostsModel();


/**
 * GET /posts/:id
 * Retorna um post
 */
router.get('/:id', async function (req: Request, res: Response) {
    const { id } = req.params;

    try {
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ success: false, error: 'ID inválido' });
        }

        const post = await postsModel.getPost(Number(id));
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post não encontrado' });
        }

        return res.status(200).json({ success: true, data: post })

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
});

/**
 * GET /posts/user/:user_id
 * Retorna todos os posts de um usuário
 */
router.get('/user/:user_id', async function (req: Request, res: Response) {
    const { user_id } = req.params;

    try {
        if (!user_id || isNaN(Number(user_id))) {
            return res.status(400).json({ success: false, error: 'ID inválido' });
        }

        const posts = await postsModel.getPosts(Number(user_id));
        if (!posts || posts.length === 0) {
            return res.status(404).json({ success: false, error: 'Nenhum post encontrado para este usuário' });
        }

        return res.status(200).json({ success: true, data: posts });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
});

/**
 * GET /posts/
 * Retorna todos os posts
 */
router.get('/', async function (req: Request, res: Response) {
    try {
        const posts = await postsModel.getAllPosts();
        if (!posts || posts.length === 0) {
            return res.status(404).json({ success: false, error: 'Nenhum post encontrado' });
        }

        return res.status(200).json({ success: true, data: posts });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
});

/**
 * POST /posts/:user_id
 * Cria um post
 */
router.post('/:user_id', async function (req: Request, res: Response) {
    const { user_id } = req.params;
    const { text, date_time, media_url } = req.body;

    try {
        if (!user_id || isNaN(Number(user_id))) {
            return res.status(400).json({ success: false, error: 'ID inválido' });
        }
        if (!date_time) {
            return res.status(400).json({ success: false, error: 'Data não informada' });
        }
        if (!text && !media_url) {
            return res.status(400).json({ success: false, error: 'Necessário informar texto ou mídia' });
        }

        const post = await postsModel.createPost(text, date_time, media_url, Number(user_id));
        if (!post) {
            return res.status(500).json({ success: false, error: 'Erro ao criar post' });
        }

        return res.status(201).json({ success: true, data: post });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
});

/**
 * PATCH /posts/:id
 * Atualiza um post
 */
router.patch('/:id', async function (req: Request, res: Response) {
    const { id } = req.params;
    const { text, date_time, media_url } = req.body;

    try {
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ success: false, error: 'id inválido' });
        }

        const post = await postsModel.getPost(Number(id));
        if (!post){
            return res.status(404).json({ success: false, error: 'Post não encontrado' });
        }

        const updatedPost = await postsModel.updatePost(
            Number(id),
            text ?? post.text,
            date_time ?? post.date_time,
            media_url ?? post.media_url
        );

        if (!updatedPost) {
            return res.status(500).json({ success: false, error: 'Erro ao atualizar post' });
        }

        return res.status(200).json({ success: true, data: updatedPost });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
});

/**
 * DELETE /posts/:id
 * Exclui um post
 */
router.delete('/:id', async function (req: Request, res: Response) {
    const { id } = req.params;

    try {
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ success: false, error: 'ID inválido' });
        }

        const deleted = await postsModel.deletePost(Number(id));
        if (!deleted) {
            return res.status(500).json({ success: false, error: 'Erro ao excluir post' });
        }

        return res.status(200).json({ success: true, data: { message: 'Post excluido com sucesso' } });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
});

module.exports = router;