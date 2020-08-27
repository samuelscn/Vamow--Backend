import { Request, Response } from 'express';
import db from '../database/connection';

export default class CategoryController {
    
    async index(request: Request, response: Response) {
        const getCategoryInformation = await db('category').select();
        
        return response.json(getCategoryInformation);
    }
    
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