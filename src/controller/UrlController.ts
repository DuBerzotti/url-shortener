  
import { Request, Response } from 'express'
import shortId from 'shortid'
import { config } from '../config/Constants'
import { URLModel } from '../database/model/URL'

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
		const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`

        //Salvar URL no banco
		const newURL = await URLModel.create({ hash, shortURL, originURL })
        response.json(newURL) //Envia a nova URL.
	}

	public async redirect(req: Request, response: Response): Promise<void> {
    //Pegar o hash da URL
		const { hash } = req.params
		
	//Verificar se  url já existe
		const url = await URLModel.findOne({ hash })

		if (url) {
			response.redirect(url.originURL)
			return
		}

		response.status(400).json({ error: 'URL not found' })
	}
}