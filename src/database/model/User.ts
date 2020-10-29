import { prop, Typegoose } from '@hasezoey/typegoose'

export class User extends Typegoose {
	@prop({ required: true, lowercase:true })
    email: string
    
    @prop({ required: true })
    nome: string

	@prop({ required: true, select:false })
	password: string
}

export const UserModel = new User().getModelForClass(User)