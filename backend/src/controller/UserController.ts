import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repositories/UserRepository";
import { CreateUserBodyType } from "../@types/types";
import jwt from "jsonwebtoken";

const userRepository = new UserRepository();

type ResponseT = {
  status: number;
  message: string;
};

export class UserController {
  constructor() {}

  async registerUser(req: FastifyRequest, res: FastifyReply) {
    const { email, name, password } = req.body as CreateUserBodyType;
    const response = (await userRepository.register(
      password,
      name,
      email
    )) as ResponseT;

    if (!response) throw "Something went wrong!";

    res.code(response.status).send({ message: response.message });
  }

  async signIn(req: FastifyRequest, res: FastifyReply) {
    const { email, password } = req.body as Omit<CreateUserBodyType, "name">;

    const response = (await userRepository.login(password, email)) as ResponseT;

    if (!response) throw "Something went wrong!";

    res.code(response.status).send({ message: response.message });
  }

  async checkSession(req: FastifyRequest, res: FastifyReply) {
    const body = JSON.parse(req.body as string);
    const response = await userRepository.checkToken(body.token);

    res.send({ message: response.message }).status(response.status);
  }
}
