import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export default class authHeader {
    async authentication(request: Request, response: Response, next: NextFunction) {
        const authHeader = request.headers.authorization;

        if(!authHeader) {
            return response.status(401).send({ error: 'No token provided'});
        }

        const [, parts] = authHeader.split(' ');

        jwt.verify(parts, "1909a332b6385afd06dec9f75249967c", (err, decoded) => {
            if (err) {
                return response.status(401).send({ error: 'Token invalid' });
            }
            return next();
        });
    }
}
