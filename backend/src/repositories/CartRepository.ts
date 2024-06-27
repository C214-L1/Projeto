import { User } from "../models/User";
import { Cart } from "../schemas/CartSchema";
import { Product } from "../schemas/ProductSchema";

export class CartRepository {
  constructor() {}

  async addProduct(userEmail: string, amount: number, productId: string) {
    const user = await User.findOne({ email: userEmail });
    const product = await Product.findOne({ _id: productId });

    if (!product || !user) return;
    if (product.amount < amount) return;

    let cart = await Cart.findOne({ user: user._id });

    if (!cart) {
      cart = new Cart({ user: user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += amount;
    } else {
      const productData = {
        productId: productId,
        quantity: amount,
        image: product.image,
        price: product.price,
        name: product.name,
      };

      cart.items.push(productData);
    }

    await cart.save();

    return {
      message: "Produto adicionado!",
    };
  }

  async getProductsInsideCard(userEmail: string) {
    const user = await User.findOne({ email: userEmail });

    if (!user) return;

    const cart = await Cart.findOne({ user: user._id })
      .populate("user")
      .populate("items.productId");

    return cart?.items;
  }

  async removeProduct(userEmail: string, amount: number, productId: string) {
    const user = await User.findOne({ email: userEmail });

    if (!user) return;

    const cart = await Cart.findOne({ user: user._id });

    if (!cart) return;

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    cart.items.splice(itemIndex, 1);
  }
}
