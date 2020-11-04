import { Request, Response, Router } from 'express'
import shortId from 'shortid'
import { config } from '../../config/Constants'
import { URLModel } from '../model/URL'
import { AccessModel } from '../model/Access'



export class URLController {
	public async shorten(req: Request, response: Response): Promise<void> {

		const { originURL } = req.body
        
        //Ver se a url já não existe
        const url = await URLModel.findOne({ originURL })
		if (url) {
			response.json(url)
			return
		}
		
		//criar o hash da URL
		const { description } = req.body
		const hash = shortId.generate()
		const shortURL = `${config.API_URL}/${hash}`
		const totalNumberAccess = 0

        //Salvar URL no banco
		const newURL = await URLModel.create({description, hash, shortURL, originURL, totalNumberAccess})
        response.json(newURL) //Envia a nova URL.
	}

	public async redirect(req: Request, response: Response): Promise<void> {
    //Pegar o hash da URL
		const { hash } = req.params
		
	//Verificar se  url já existe
		const url = await URLModel.findOne({ hash })

		if (url) {
			// Atualiza o número de acesso na variavel totalNumberAccess
			await URLModel.updateOne
			(
				{_id : url._id}, 
				{totalNumberAccess : url.totalNumberAccess + 1}
			);

			//Salvar Historico de acesso por dia e hora
			const IdUrl = url._id

			const access = await AccessModel.findOne({ IdUrl })

			if (access) 
			{
				await AccessModel.updateOne
				(
					{_id : access._id}, 
					{NumberAccess : access.NumberAccess + 1}
				);
			
				//redireciona para URL original
				response.redirect(url.originURL)
				return
			}

			const AccessDescription  = url.description

			const now = new Date

			const AccessDay = now.getDay() + "/" + now.getMonth() + "/" + now.getFullYear()

			const Hour = now.getHours() + ":" + now.getMinutes()

			const NumberAccess = 1
	
			//Salvar Historico no banco
			const newAccess = await AccessModel.create({AccessDescription, IdUrl, AccessDay, Hour, NumberAccess})
			
			response.redirect(url.originURL)
			return
		}

		response.status(400).json({ error: 'URL not found' })
	}
}