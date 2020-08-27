import { Request, Response } from 'express';
import db from '../database/connection';


interface Global {
    nome: string;
}

export default class CityController {
    
    async index(request: Request, response: Response) {
        const getCityInformation = await db('city').select();
        
        return response.json(getCityInformation);
    }

    async getCity(request: Request, response: Response) {
        const { stateId } = request.params;

        const getCities = await db('city')
            .where('city.state_id', '=', stateId)
            .select();
        
        return response.json(getCities);
    }

    async create(request: Request, response: Response) {
        const {
            nome,
            state_id
        } = request.body;

        await db('city').insert({
            nome,
            state_id
        });

        return response.send();
    }
}