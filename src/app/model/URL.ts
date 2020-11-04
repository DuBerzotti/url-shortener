import { prop, Typegoose } from '@hasezoey/typegoose'

export class URL extends Typegoose {

	@prop({ required: true })
	description: string

	@prop({ required: true })
	hash: string

	@prop({ required: true })
	originURL: string

	@prop({ required: true })
	shortURL: string

	@prop({ required: true })
	totalNumberAccess: number
}

export const URLModel = new URL().getModelForClass(URL)