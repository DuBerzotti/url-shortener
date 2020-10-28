import { Request, Response } from 'express'
import { UserModel } from '../database/model/User'
import PasswordHash from "../config/utils/PasswordHash"

export class UserController 
{
    public async newUser(req: Request, res: Response): Promise<void> 
    {
        try
        {
            const { email } = req.body
        
            //Ver se à usuário cadastrado
            const url = await UserModel.findOne({ email })
            if (url) {
                res.status(400).send({error: 'Email já cadastrado'})
                return
            }
            
            //criar o usuário
            const { nome } = req.body
            const { password } = req.body

            //Encriptando senha
            const hashedPassword = await PasswordHash.hash(password)
    
            //Salvar usuário no banco
            const newUser = await UserModel.create({ email, nome, password: hashedPassword})
            res.json(newUser) //Envia novo usuário.

        }catch (err)
        {
            console.log(err)
            res.status(400).send({error: 'Registration Failed'})
            return
        }

    }
}