import { User } from "../models/User";
import { Cart } from "../schemas/CartSchema";
import { Product } from "../schemas/ProductSchema";

export class CartRepository {
  constructor() {}

  async addProduct(userEmail: string, amount: number, productId: string) {
    console.log(`Searching for user with email: ${userEmail}`);
    const user = await User.findOne({ email: userEmail });
    console.log(`User found: ${user}`);

    console.log(`Searching for product with id: ${productId}`);
    const product = await Product.findOne({ _id: productId });
    console.log(`Product found: ${product}`);

    if (!product || !user) {
      console.log("Product or user not found");
      return;
    }
    if (product.amount < amount) {
      console.log("Not enough product amount");
      return;
    }

    let cart = await Cart.findOne({ user: user._id });
    console.log(`Cart found: ${cart}`);

    if (!cart) {
      cart = new Cart({ user: user._id, items: [] });
      console.log("Created new cart");
    }

    console.log("Checking if product is already in the cart");
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );
    console.log(`Item index: ${itemIndex}`);

    if (itemIndex > -1) {
      console.log("Product found in cart, increasing quantity");
      cart.items[itemIndex].quantity += amount;
    } else {
      console.log("Product not found in cart, adding new item");
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
    console.log("Cart saved");

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
