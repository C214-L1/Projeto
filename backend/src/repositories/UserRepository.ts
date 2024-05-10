import { Document } from "mongoose";
import { DuplicateKeyError } from "../errors/handling";
import { User } from "../models/User";
import { hash, compare } from 'bcrypt'
import jwt from "jsonwebtoken"

export class UserRepository {
    constructor(){}

    async findUserByEmail(email: string) {
        const user = await User.findOne({ email })
        
        if(user) return user;

        return false;
    }

    async findUserByPhoneNumber(phoneNumber: string) {
        const user = await User.findOne({ phoneNumber })

        if(user) return user;

        return false;
    }

    /* 
        TODO: Criar uma validação para e-mails vazios no banco de dados
        caso o usuário cadastre-se com número de telefone e vice-versa
    **/ 
    async register(password: string, name: {first: string, last: string}, email?: string, phoneNumber?: string){

        if(!email && !phoneNumber) 
            return { 
                status: 400,
                message: "Phone number or email is required!"
            }
        const hashedPassword = await hash(password, 15);
        
        let user: Document;
        const nameObject = { first: name.first, last: name.last };

        user = email ? new User({ email, phoneNumber: "", password: hashedPassword, name: nameObject}) : new User({ phoneNumber, email: "", password: hashedPassword, name: nameObject})
        
        try {
            await user!.save()
            return {
                status: 201,
                message: "User created!"
            }
        } catch (error: any) {
            if(error.code && error.code == 11000){
                return DuplicateKeyError(error)
            }
        }
    }

    async login(password: string, email?: string, phoneNumber?: string){
        let foundedUser: any;

        if(email?.length == 0 && phoneNumber?.length == 0) {
            return {
                status: 400,
                message: "An email or phone number is required to do login"
            }
        }

        foundedUser = email ? await this.findUserByEmail(email) : await this.findUserByPhoneNumber(phoneNumber || "")

        if(!foundedUser) 
            return {
                status: 404, // Not found user
                message: "This e-mail not exists"
            }
        
        const isPasswordValid = await compare(password, foundedUser.password as string);

        if(!isPasswordValid)
            return {
                status: 401,
                message: "Invalid password"
            }

        const privateKey = process.env.JWT_PRIVATE_KEY || "fallback";

        const token = jwt.sign({
            name: foundedUser.name,
            email: foundedUser.email,
            phoneNumber: foundedUser.phoneNumber
        }, privateKey, {expiresIn: '8h'})
        
        return {
            status: 200,
            message: {
                token
            }
        }
    }
}