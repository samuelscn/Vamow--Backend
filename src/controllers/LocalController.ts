import { Request, Response } from 'express';
import db from '../database/connection';

export default class LocalController {
    
    async create(request: Request, response: Response) {
        const {
            nome
        } = request.body;

        await db('local').insert({nome});

        return response.send();
    }
}