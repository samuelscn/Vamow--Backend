import { Request, Response } from 'express';
import db from '../database/connection';

export default class CategoryController {
    
    async create(request: Request, response: Response) {
        const {
            nome
        } = request.body;

        await db('category').insert({
            nome
        });

        return response.send();
    }
}