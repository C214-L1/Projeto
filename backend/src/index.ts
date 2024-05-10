import Fastify from "fastify";
import { connectToMongo } from "./lib/db";
import { UserController } from "./controller/UserController";

export const app = Fastify()
const userController = new UserController()

const PORT = process.env.SERVER_PORT || 7777


app.post("/register", userController.registerUser)
app.post("/login", userController.signIn)
app.get("/", (req, res) => {
    res.code(200).send({test: "AAA"})
})


app.listen({ port: 7777 }, (err) => {
    if(err){
        console.log(err)
        process.exit()
    }

    connectToMongo()
    console.log(`Server running at port ${PORT}`)
})

export function getServer(){
    return app;
}