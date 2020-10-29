import {NextFunction, request, Request, Response} from 'express'
import jwt from "jsonwebtoken"
import  authConfig  from '../config/auth.json'

module.exports = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization

    //Verificando se tem header
    if(!authHeader)
    {
        return res.status(401).send({error: 'No token provided'})
    }

    //verificar se o JWT esta com formato correto
    const parts = authHeader.split(' ')

    if(parts.length !== 2)
    {
        return res.status(401).send({error: 'Token error'})
    }

    const [scheme, token ] = parts

    if(!/^Bearer$/i.test(scheme))
    {
        return res.status(401).send({error: 'Token malformatted'})
    }

    jwt.verify(token, authConfig.secret, (err, decoded) =>{
        if(err)
        {
            return res.status(401).send({error: 'Token invalid'})
        }

        return next()

    })
}