import Fastify from "fastify";
import { connectToMongo } from "./lib/db";
import { UserController } from "./controller/UserController";
import cors from "@fastify/cors";
import { ProductController } from "./controller/ProductController";
import { CartController } from "./controller/CartController";

export const app = Fastify();
const userController = new UserController();
const productController = new ProductController();
const cartController = new CartController();

const PORT = process.env.SERVER_PORT || 7777;

app.register(cors, {});

app.post("/register", userController.registerUser);
app.post("/login", userController.signIn);
app.post("/check", userController.checkSession);
app.get("/products/all", productController.getAllProducts);
app.get("/products/:id", productController.getSpecificProduct);
app.post("/cart/add", cartController.addProductToCard);
app.get("/cart/all", cartController.getAllProductsInsideCart);

app.listen({ port: 7777 }, (err) => {
  if (err) {
    console.log(err);
    process.exit();
  }

  connectToMongo();
  console.log(`Server running at port ${PORT}`);
});

export function getServer() {
  return app;
}
