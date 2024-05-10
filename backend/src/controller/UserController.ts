import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repositories/UserRepository";
import { CreateUserBodyType } from "../@types/types";

const userRepository = new UserRepository()

type ResponseT = {
    status: number,
    message: string
}

export class UserController{
    
    constructor(){}

    async registerUser(req: FastifyRequest, res: FastifyReply){
        const { email, name, password, phoneNumber } = req.body as CreateUserBodyType
        const response = await userRepository.register(password, name, email, phoneNumber) as ResponseT

        if(!response) throw "Something went wrong!"

        res.code(response.status).send({message: response.message})
    }

    async signIn(req: FastifyRequest, res: FastifyReply){
        const { email, password, phoneNumber } = req.body as Omit<CreateUserBodyType, "name">

        const response = await userRepository.login(password, email, phoneNumber) as ResponseT

        if(!response) throw "Something went wrong!"

        res.code(response.status).send({message: response.message})
    }
}