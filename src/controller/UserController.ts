import { Request, Response } from 'express'
import { UserModel } from '../database/model/User'
import PasswordHash from "../config/utils/PasswordHash"
import  authConfig  from '../config/auth.json'

import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export class UserController 
{
    public async newUser(req: Request, res: Response): Promise<void> 
    {
        try
        {
            const { email } = req.body
        
            //Ver se à usuário cadastrado
            const url = await UserModel.findOne({ email })
            if (url) 
            {
                res.status(400).send({error: 'User already exists'})
                return
            }
            
            //criar o usuário
            const { nome } = req.body
            const { password } = req.body

            //Encriptando senha
            const hashedPassword = await PasswordHash.hash(password)
    
            //Salvar usuário no banco
            const newUser = await UserModel.create({ email, nome, password: hashedPassword})

            //Não retorna a senha
            newUser.password = undefined
            
            //Envia novo usuário.
            res.json(newUser)

        }catch (err)
        {
            console.log(err)
            res.status(400).send({error: 'Registration Failed'})
            return
        }

    }

    public async AutenticateUser(req: Request, res: Response) {
        const {email, password} = req.body;
    
        const user = await UserModel.findOne({email}).select('+password')
    
        if(!user)
        {
            return res.status(400).send({error: 'User not found'})
        }
    
        if(!await bcrypt.compare(password, user.password))
        {
            return res.status(400).send({error: 'Invalid password'})
        }
    
        user.password = undefined
    
        res.send({
             user, token: generateToken ({id: user.id}) })
    }
    
}// Fim UserController

function generateToken(params = {})
{
    return jwt.sign
    (
        { params }, authConfig.secret, 
        {
        expiresIn:86400
        }
    )
}