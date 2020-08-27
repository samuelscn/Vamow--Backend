import { Request, Response } from 'express';
import db from '../database/connection';

export default class LocalController {

    async index(request: Request, response: Response) {
        const getLocalInformation = await db('local').select();
        
        return response.json(getLocalInformation);
    }

    async getLocal(request: Request, response: Response) {
        const { cityId } = request.params;

        const getLocals = await db('local')
            .where('local.city_id', '=', cityId)
            .select();
        
        return response.json(getLocals);
    }
    
    async create(request: Request, response: Response) {
        const {
            nome,
            city_id
        } = request.body;

        await db('local').insert({nome , city_id});

        return response.send();
    }
}