import { Product } from "../schemas/ProductSchema";

export class ProductRepository {
  constructor() {}

  async getAll() {
    const allProducts = await Product.find({});

    return {
      message: allProducts,
      status: 200,
    };
  }

  async getSpecificProduct(productId: string) {
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return {
        status: 404,
        message: "Não encontrado",
      };
    }

    return {
      message: product,
      status: 200,
    };
  }
}
