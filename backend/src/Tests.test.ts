import { describe, expect, afterAll } from "@jest/globals";
import { app } from ".";

describe("SETUP ENVIROMENT", () => {
  afterAll(() => app.close());

  describe("POST /register", () => {
    it("should return 400 and message explaining error if email is missing", async () => {
      const res = await app.inject({
        url: "/register",
        method: "POST",
        body: {
          password: "123456",
          name: {
            first: "Gabriel",
            last: "Costa",
          },
        },
      });

      expect(res.statusCode).toEqual(400);
      expect(JSON.parse(res.payload)).toStrictEqual({
        message: "Email is required!",
      });
    });

    it("should return 400 and message asking that user already exists", async () => {
      const res = await app.inject({
        url: "/register",
        method: "POST",
        body: {
          email: "gabriel.cost1a@gec.inatel.br",
          password: "123456",
          name: {
            first: "Gabriel",
            last: "Costa",
          },
        },
      });

      expect(res.statusCode).toEqual(400);
      expect(JSON.parse(res.payload)).toStrictEqual({
        message: "User already exists!",
      });
    });

    it("should return 201 and message 'User created' with e-mail", async () => {
      const res = await app.inject({
        url: "/register",
        method: "POST",
        body: {
          email: "novo_usuario_do_inatel@gec.inatel.br",
          password: "123456",
          name: {
            first: "Gabriel",
            last: "Costa",
          },
        },
      });

      expect(res.statusCode).toEqual(201);
      expect(JSON.parse(res.payload)).toStrictEqual({
        message: "User created!",
      });
    });
  });

  describe("POST /login", () => {
    it("should return 200 by email login and message with JWT token", async () => {
      const res = await app.inject({
        url: "/login",
        method: "POST",
        body: {
          email: "gabriel.cost1a@gec.inatel.br",
          password: "123456",
        },
      });

      expect(res.statusCode).toEqual(200);
      expect(JSON.parse(res.payload)).toEqual({
        message: { token: expect.any(String) },
      });
    });

    it("should return 401 and contains message if password is incorrect", async () => {
      const res = await app.inject({
        url: "/login",
        method: "POST",
        body: {
          email: "gabriel.cost1a@gec.inatel.br",
          password: "invalid-password",
        },
      });

      expect(res.statusCode).toEqual(401);
      expect(JSON.parse(res.payload)).toStrictEqual({
        message: "Invalid password",
      });
    });

    it("should return 404 and contains message if user not founded", async () => {
      const res = await app.inject({
        url: "/login",
        method: "POST",
        body: {
          email: "user_not_founded@gec.inatel.br",
          password: "123456",
        },
      });

      expect(res.statusCode).toEqual(404);
      expect(JSON.parse(res.payload)).toStrictEqual({
        message: "This e-mail not exists",
      });
    });
  });

  describe("GET /products/all", () => {
    it("should return a list with 8 items", async () => {
      const res = await app.inject({
        url: "/products/all",
        method: "GET",
      });

      expect(res.statusCode).toBe(200);

      const body = JSON.parse(res.body);

      expect(Array.isArray(body.message)).toBe(true);
      expect(body.message.length).toBe(8);
    });
  });

  describe("GET /products/:id", () => {
    it("should return a product called Protetor Térmico para Wastegate 45mm Titanium", async () => {
      const productId = "667c73322b164de6967b355f";

      const res = await app.inject({
        url: `/products/${productId}`,
        method: "GET",
      });

      const body = JSON.parse(res.body);
      expect(body.message.name).toBe(
        "Protetor Térmico para Wastegate 45mm Titanium"
      );
    });
  });
});
