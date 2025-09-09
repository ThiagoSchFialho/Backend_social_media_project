import { Request, Response } from 'express';
var express = require('express');
var router = express.Router();

import { CommentsModel } from '../models/comments.model';
const commentsModel = new CommentsModel();


/**
 * GET /comments/:post_id
 * Retorna os comentarios de um post
 */
router.get('/:post_id', async function (req: Request, res: Response) {
    const { post_id } = req.params;
    
    try {
        if (!post_id || isNaN(Number(post_id))) {
            return res.status(400).json({ success: false, error: 'ID inválido' });
        }

        const comments = await commentsModel.getComments(Number(post_id));
        
        return res.status(200).json({ success: true, data: comments });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
});

/**
 * POST /comments/:user_id
 * Cria um commentário em um post
 */
router.post('/:user_id', async function (req: Request, res: Response) {
    const { user_id } = req.params;
    const { text, date_time, post_id } = req.body;
    
    try {
        if (!user_id || isNaN(Number(user_id)) || !post_id || isNaN(Number(post_id))) {
            return res.status(400).json({ success: false, error: 'ID inválido' });
        }
        if (!text || !date_time) {
            return res.status(400).json({ success: false, error: 'Campos obrigatórios não informados' });
        }

        const comment = await commentsModel.createComment(text, date_time, Number(post_id), Number(user_id));
        if (!comment) return res.status(500).json({ success: false, error: 'Erro ao criar comentário' });

        return res.status(201).json({ success: true, data: comment });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
});

/**
 * PUT /comments/:id
 * Modifica um comentário
 */
router.patch('/:id', async function (req: Request, res: Response) {
    const { id } = req.params;
    const { text, date_time } = req.body;
    
    try {
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ success: false, error: 'ID inválido' });
        }
        if (!text) {
            return res.status(400).json({ success: false, error: 'Campos obrigatórios não informados' });
        }

        const comment = await commentsModel.getComment(Number(id));
        if (!comment) return res.status(404).json({ success: false, error: 'Comentário não encontrado' });

        const updatedComment = await commentsModel.updateComment(Number(id), text, date_time ?? comment.date_time);
        if (!comment) return res.status(500).json({ success: false, error: 'Erro ao atualizar comentário' });

        return res.status(200).json({ success: true, data: updatedComment });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
});

/**
 * DELETE /comments/:id
 * Exclui um comentário
 */
router.delete('/:id', async function (req: Request, res: Response) {
    const { id } = req.params;
    
    try {
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ success: false, error: 'ID inválido' });
        }

        const comment = await commentsModel.getComment(Number(id));
        if (!comment) return res.status(404).json({ success: false, error: 'Comentário não encontrado' });

        const deleted = await commentsModel.deleteComment(Number(id));
        if (!deleted) return res.status(500).json({ success: false, error: 'Erro ao excluir comentário' });

        return res.status(200).json({ success: true, data: { message: 'Comentário excluido com sucesso' } });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
});

module.exports = router;