import { Request, Response } from 'express';
var express = require('express');
var router = express.Router();

import { UsersModel } from '../models/users.model';
const usersModel = new UsersModel();

router.get('/:user_id', async function (req: Request, res: Response, next: any) {
  const { user_id } = req.params;

  try {
    if (!user_id || isNaN(Number(user_id))) {
      return res.status(400).json({ error: 'user_id inválido' });
    }

    const user = await usersModel.getUser(Number(user_id));
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json(user);

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/', async function (req: Request, res: Response) {
  const { email } = req.query;

  try {
    if (!email) return res.status(400).json({ error: 'Email indefinido' });

    const user = await usersModel.getUserByEmail(String(email));
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json(user);

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/', async function (req: Request, res: Response) {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Campos obrigatórios não informados' });
    }

    const user = await usersModel.getUserByEmail(email);
    if (user) return res.status(409).json({ message: 'Email informado já está em uso' });

    const newUser = await usersModel.createUser(email, password, name);
    if (!newUser) return res.status(500).json({ error: 'Erro ao criar usuário' });

    return res.status(201).json(newUser);

  } catch (error: any){
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/:user_id', async function (req: Request, res: Response) {
  const { user_id } = req.params;
  const { email, password, name } = req.body;

  try {
    if (!user_id || isNaN(Number(user_id))) {
      return res.status(400).json({ error: 'user_id inválido' });
    }
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Campos obrigatórios não informados' });
    }

    const user = await usersModel.getUser(Number(user_id));
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const updatedUser = await usersModel.updateUser(Number(user_id), email, password, name);
    if (!updatedUser) return res.status(500).json({ error: 'Erro ao atualizar usuário' });

    return res.status(200).json(updatedUser);

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.delete('/:user_id', async function (req: Request, res: Response) {
  const { user_id } = req.params;

  try {
    if (!user_id || isNaN(Number(user_id))) {
      return res.status(400).json({ error: 'user_id inválido' });
    }

    const deleted = await usersModel.deleteUser(Number(user_id));
    if (!deleted) return res.status(404).json({ error: 'Usuário não encontrado' });


    return res.status(200).json({ message: 'Usuário excluido com sucesso' });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
