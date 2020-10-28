import { prop, Typegoose } from '@hasezoey/typegoose'

export class User extends Typegoose {
	@prop({ required: true })
    email: string
    
    @prop({ required: true })
    nome: string

	@prop({ required: true })
	password: string
}

export const UserModel = new User().getModelForClass(User)