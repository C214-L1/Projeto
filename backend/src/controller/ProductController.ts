import { FastifyReply, FastifyRequest } from "fastify";
import { ProductRepository } from "../repositories/ProductRepository";

const productRepository = new ProductRepository();

interface ParamsType {
  id: string;
}

export class ProductController {
  constructor() {}

  async getAllProducts(req: FastifyRequest, res: FastifyReply) {
    const response = await productRepository.getAll();

    if (!response) throw "Something went wrong!";

    res.send({ message: response.message }).status(response.status);
  }

  async getSpecificProduct(req: FastifyRequest, res: FastifyReply) {
    const params = req.params as ParamsType;
    const param = params.id;

    const response = await productRepository.getSpecificProduct(param);

    if (!response) throw "Something went wrong!";

    res.send({ message: response.message }).status(response.status);
  }
}
