import { prop, Typegoose } from '@hasezoey/typegoose'

export class Access extends Typegoose {

	@prop({ required: true })
	AccessDescription: string

	@prop({ required: true })
	IdUrl: string

	@prop({ required: true })
    AccessDay: string
    
    @prop({ required: true })
    Hour: number
    
    @prop({ required: true })
	NumberAccess: number
}

export const AccessModel = new Access().getModelForClass(Access)