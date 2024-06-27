import { FastifyReply, FastifyRequest } from "fastify";
import { CartRepository } from "../repositories/CartRepository";
import jwt from "jsonwebtoken";

const cartRepository = new CartRepository();

export class CartController {
  constructor() {}

  async addProductToCard(req: FastifyRequest, res: FastifyReply) {
    const body = req.body;
    const {
      amount,
      jwt: JsonWebToken,
      productId,
    } = JSON.parse(body as string) as {
      jwt: string;
      amount: number;
      productId: string;
    };

    const privateKey = process.env.JWT_PRIVATE_KEY || "fallback";

    const decoded: any = jwt.verify(JsonWebToken, privateKey);

    const response = await cartRepository.addProduct(
      decoded.email,
      amount,
      productId
    );

    if (!response) throw "Something went wrong!";

    res.send({ message: response.message });
  }

  async getAllProductsInsideCart(req: FastifyRequest, res: FastifyReply) {
    const authorizationHeader = req.headers.authorization;
    const privateKey = process.env.JWT_PRIVATE_KEY || "fallback";

    const decoded: any = jwt.verify(authorizationHeader!, privateKey);

    const response = await cartRepository.getProductsInsideCard(decoded.email);

    if (!response) throw "Something went wrong!";

    res.send({ message: response });
  }
}
