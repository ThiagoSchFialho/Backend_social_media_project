import { Request, Response } from 'express';
var express = require('express');
var router = express.Router();

import { AnswersModel } from '../models/answers.model';
const answersModel = new AnswersModel();


/**
 * GET /answers/comment
 * Retorna todas as responstas de um comentário
 */
router.get('/comment', async function (req: Request, res: Response) {
    const { comment_id } = req.body;

    try {
        if (!comment_id || isNaN(Number(comment_id))) {
            return res.status(400).json({ success: false, error: 'ID inválido' });
        }

        const answers = await answersModel.getByComment(Number(comment_id));

        return res.status(200).json({ success: true, data: answers });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
});

/**
 * GET /answers/answer
 * Retorna todas as respostas de uma resposta
 */
router.get('/answer', async function (req: Request, res: Response) {
    const { parent_answer_id } = req.body;

    try {
        if (!parent_answer_id || isNaN(Number(parent_answer_id))) {
            return res.status(400).json({ success: false, error: 'ID inválido' });
        }

        const answers = await answersModel.getByAnswer(Number(parent_answer_id));

        return res.status(200).json({ success: true, data: answers });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
});

/**
 * POST /answers/comment/:user_id
 * Cria uma resposta para um comentário
 */
router.post('/comment/:user_id', async function (req: Request, res: Response) {
    const { user_id } = req.params;
    const { text, date_time, comment_id } = req.body;

    try {
        if (!user_id || isNaN(Number(user_id))) {
            return res.status(400).json({ success: false, error: 'ID do usuário inválido' });
        }
        if (!comment_id || isNaN(Number(comment_id))) {
            return res.status(400).json({ success: false, error: 'ID do comentário inválido' });
        }
        if (!text || !date_time) {
            return res.status(400).json({ success: false, error: 'Campos obrigatórios não informados' });
        }

        const answer = await answersModel.createAnswer(
            text,
            date_time,
            Number(user_id),
            Number(comment_id),
            null
        );
        if (!answer) {
            return res.status(500).json({ success: false, error: 'Erro ao criar resposta' });
        }

        return res.status(201).json({ success: true, data: answer });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
});

/**
 * POST /answers/answer/:user_id
 * Cria uma resposta para uma resposta
 */
router.post('/answer/:user_id', async function (req: Request, res: Response) {
    const { user_id } = req.params;
    const { text, date_time, parent_answer_id } = req.body;

    try {
        if (!user_id || isNaN(Number(user_id))) {
            return res.status(400).json({ success: false, error: 'ID do usuário inválido' });
        }
        if (!parent_answer_id || isNaN(Number(parent_answer_id))) {
            return res.status(400).json({ success: false, error: 'ID da resposta inválido' });
        }
        if (!text || !date_time) {
            return res.status(400).json({ success: false, error: 'Campos obrigatórios não informados' });
        }

        const answer = await answersModel.createAnswer(
            text,
            date_time,
            Number(user_id),
            null,
            Number(parent_answer_id)
        );
        if (!answer) {
            return res.status(500).json({ success: false, error: 'Erro ao criar resposta' });
        }

        return res.status(201).json({ success: true, data: answer });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
});

/**
 * PATCH /answers/:id
 * Atualiza uma resposta
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

        const answer = await answersModel.getAnswer(Number(id));
        if (!answer) return res.status(404).json({ success: false, error: 'Resposta não encontrada' });

        const updatedAnswer = await answersModel.updateAnswer(Number(id), text, date_time ?? answer.date_time);
        if (!updatedAnswer) return res.status(500).json({ success: false, error: 'Erro ao atualizar resposta' });

        return res.status(200).json({ success: true, data: updatedAnswer });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
});

/**
 * DELETE /answers/:id
 * Exclui uma resposta
 */
router.delete('/:id', async function (req: Request, res: Response) {
    const { id } = req.params;

    try {
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ success: false, error: 'ID inválido' });
        }

        const answer = await answersModel.getAnswer(Number(id));
        if (!answer) return res.status(404).json({ success: false, error: 'Resposta não encontrada' });

        const deleted = await answersModel.deleteAnswer(Number(id));
        if (!deleted) return res.status(500).json({ success: false, error: 'Erro ao excluir resposta' });

        return res.status(200).json({ success: true, data: { message: 'Responsta Excluida com sucesso' } });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
});

module.exports = router;