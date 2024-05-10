import { describe, expect, afterAll } from "@jest/globals"
import { app } from "..";

describe("SETUP ENVIROMENT", () => {

    afterAll(() => app.close());

    describe("GET /", () => {
        it("should be returns status code 200", async () => {
            const res = await app.inject({
                url: "/",
                method: "GET"
            })

            expect(res.statusCode).toEqual(200);
        })
    })

    describe("POST /register", () => {
        it("should return 400 and message explaining error if email and phonenumber is missing", async () => {
            const res = await app.inject({
                url: "/register",
                method: "POST",
                body: {
                    "password": "123456",
                    "name": {
                        "first": "Gabriel",
                        "last": "Costa"
                    }
                }
            })

            expect(res.statusCode).toEqual(400);
            expect(JSON.parse(res.payload)).toStrictEqual({ message: "Phone number or email is required!" })
        })

        it("should return 201 and message 'User created' with e-mail", async () => {
            const res = await app.inject({
                url: "/register",
                method: "POST",
                body: {
                    "email": "gabriel.cost1a@gec.inatel.br",
                    "password": "123456",
                    "name": {
                        "first": "Gabriel",
                        "last": "Costa"
                    }
                }
            })

            expect(res.statusCode).toEqual(201);
            expect(JSON.parse(res.payload)).toStrictEqual({ message: "User created!" })
        }) // 10s timeout

        it("should return 201 and message 'User created' with phone number", async () => {
            const res = await app.inject({
                url: "/register",
                method: "POST",
                body: {
                    "phoneNumber": "(35) 99991-9999",
                    "password": "123456",
                    "name": {
                        "first": "Gabriel",
                        "last": "Costa"
                    }
                }
            })

            expect(res.statusCode).toEqual(201);
            expect(JSON.parse(res.payload)).toStrictEqual({ message: "User created!" })
        }) // 10s timeout
    })

    describe("POST /login", () => {

        it("should return 200 by email login and message with JWT token", async () => {
            const res = await app.inject({
                url: "/login",
                method: "POST",
                body: {
                    "email": "gabriel.cost1a@gec.inatel.br",
                    "password": "123456",
                }
            })

            expect(res.statusCode).toEqual(200);
            expect(JSON.parse(res.payload)).toEqual({ message: { token: expect.any(String) } })
        })

        it("should return 200 by phone number login and message with JWT token", async () => {
            const res = await app.inject({
                url: "/login",
                method: "POST",
                body: {
                    "phoneNumber": "(35) 99991-9999",
                    "password": "123456",
                }
            })

            expect(res.statusCode).toEqual(200);
            expect(JSON.parse(res.payload)).toEqual({ message: { token: expect.any(String) } })
        })

        it("should return 401 and contains message if password is incorrect", async () => {
            const res = await app.inject({
                url: "/login",
                method: "POST",
                body: {
                    "phoneNumber": "(35) 99991-9999",
                    "password": "invalid-password",
                }
            })

            expect(res.statusCode).toEqual(401);
            expect(JSON.parse(res.payload)).toStrictEqual({ message: "Invalid password" })
        })

        it("should return 404 and contains message if user not founded", async () => {
            const res = await app.inject({
                url: "/login",
                method: "POST",
                body: {
                    "phoneNumber": "(35) 999-9999",
                    "password": "123456",
                }
            })

            expect(res.statusCode).toEqual(404);
            expect(JSON.parse(res.payload)).toStrictEqual({ message: "This e-mail not exists" })
        })
    })
})