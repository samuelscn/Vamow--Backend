import { Request, Response } from 'express';
import db from '../database/connection';
import jwt from 'jsonwebtoken';

interface Global {
    id: number;
}

export default class UsersController {
    async index(request: Request, response: Response) {
        const getUserData = await db('users').select();

        const token = jwt.sign({ id: getUserData[0].id }, "1909a332b6385afd06dec9f75249967c", {
            expiresIn: 86400,
        });

        return response.json({getUserData, token});
    }

    async authenticated(request: Request, response: Response) {
        const { email, senha } = request.params;

        const trx = await db.transaction();

        try {
            const getUserData = await trx('users')
                .where('users.email', '=', email)
                .where('users.senha', '=', senha)
                .select();

            await trx.commit(); 

            return response.json({
                getUserData, 
                token: jwt.sign({email, senha}, "1909a332b6385afd06dec9f75249967c")
            })
        } catch(err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Unexpected error while authenticated your informations'
            })
        }
    }

    async create(request: Request, response: Response) {
        const {
            nome,
            sobrenome,
            email,
            senha
        } = request.body;

        const getUserData = request.body;

        const trx = await db.transaction();

        try {
            await trx('users').insert({
                nome,
                sobrenome,
                email,
                senha
            });

            const token = jwt.sign({ email, senha }, "1909a332b6385afd06dec9f75249967c", {
                expiresIn: 86400,
            });

            await trx.commit();
            
            return response.json({getUserData, token});
        } catch(err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Unexpected error while creating new event'
            })
        }
    }

    async searchforemail(request: Request, response: Response) {
        const { email } = request.params;

        const getUserId = await db('users')
            .where('users.email', '=', email)
            .select('id');

        response.json(getUserId);
    }
}