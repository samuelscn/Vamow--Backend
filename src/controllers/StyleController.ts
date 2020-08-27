import { Request, Response } from 'express';
import db from '../database/connection';

export default class StyleController {
    
    async index(request: Request, response: Response) {
        const getStyleInformation = await db('style').select();
        
        return response.json(getStyleInformation);
    }

    async create(request: Request, response: Response) {
        const {
            nome
        } = request.body;

        await db('style').insert({nome});

        return response.send();
    }
}