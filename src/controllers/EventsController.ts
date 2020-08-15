import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../database/utils/convertHourToMinutes';

interface ScheduleItem {
    cidade: string;
    local: string;
    valor: number;
    dia_da_semana: number;
    inicio: string;
    termino: string;
    estilo: string;
}

export default class EventsController {

    async index(request: Request, response: Response) {
        const filters = request.query;

        if (!filters.dia_da_semana || !filters.estilo || !filters.cidade) {
            return response.status(400).json ({
                error: 'Missing filter to search events'
            });
        }
       
        const events = await db('class_schedule')
            .where('class_schedule.estilo', '=' , filters.estilo as string)
            .andWhere('class_schedule.dia_da_semana', '=' , filters.dia_da_semana as string )
            .andWhere('class_schedule.cidade', '=' , filters.cidade as string)
            .join('events', 'class_schedule.events_id', '=', 'events.id')
            .select(['events.*', 'class_schedule.*']);

        return response.json(events);
    }

    async create(request: Request, response: Response) {
        const {
            nome,
            sobrenome,
            email,
            cidade,
            senha,
            avatar,
            nomeEvento,
            descricao,
            avatarEvento,
            schedule
        } = request.body;
    
        const trx = await db.transaction();
     
        try {
            const insertUsersIds = await trx('users').insert({
                nome,
                sobrenome,
                email,
                cidade,
                senha,
                avatar,
            });
        
            const user_id = insertUsersIds[0];
        
            const EventsIds = await trx('events').insert({
                nomeEvento,
                descricao,
                avatarEvento,
                user_id,
            });
        
            const events_id = EventsIds[0];
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    events_id,
                    cidade: scheduleItem.cidade,
                    local: scheduleItem.local,
                    estilo: scheduleItem.estilo,
                    valor: scheduleItem.valor,
                    dia_da_semana: scheduleItem.dia_da_semana,
                    inicio: convertHourToMinutes(scheduleItem.inicio),
                    termino: convertHourToMinutes(scheduleItem.termino)
                };
            });
        
            await trx('class_schedule').insert(classSchedule);
            
            await trx.commit();
        
            return response.status(201).send();
        } catch(err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Unexpected error while creating new event'
            })
        }
    
    }
}