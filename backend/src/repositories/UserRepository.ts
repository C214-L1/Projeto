import { Document } from "mongoose";
import { DuplicateKeyError } from "../errors/handling";
import { User } from "../models/User";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

export class UserRepository {
  constructor() {}

  async findUserByEmail(email: string) {
    const user = await User.findOne({ email });

    if (user) return user;

    return false;
  }

  async register(
    password: string,
    name: { first: string; last: string },
    email: string
  ) {
    if (!email)
      return {
        status: 400,
        message: "Email is required!",
      };
    const hashedPassword = await hash(password, 15);

    const user = await this.findUserByEmail(email);

    if (user)
      return {
        status: 400,
        message: "User already exists!",
      };

    const nameObject = { first: name.first, last: name.last };

    try {
      await new User({
        email,
        password: hashedPassword,
        name: nameObject,
      }).save();
      return {
        status: 201,
        message: "User created!",
      };
    } catch (error: any) {
      if (error.code && error.code == 11000) {
        return DuplicateKeyError(error);
      }
    }
  }

  async login(password: string, email: string) {
    let foundedUser: any;

    if (email?.length == 0) {
      return {
        status: 400,
        message: "An email is required to do login",
      };
    }

    foundedUser = await this.findUserByEmail(email);

    if (!foundedUser)
      return {
        status: 404, // Not found user
        message: "This e-mail not exists",
      };

    const isPasswordValid = await compare(
      password,
      foundedUser.password as string
    );

    if (!isPasswordValid)
      return {
        status: 401,
        message: "Invalid password",
      };

    const privateKey = process.env.JWT_PRIVATE_KEY || "fallback";

    const token = jwt.sign(
      {
        name: foundedUser.name,
        email: foundedUser.email,
        phoneNumber: foundedUser.phoneNumber,
      },
      privateKey,
      { expiresIn: "8h" }
    );

    return {
      status: 200,
      message: {
        token,
      },
    };
  }

  async checkToken(token: string) {
    const privateKey = process.env.JWT_PRIVATE_KEY || "fallback";

    const decoded: any = jwt.verify(token, privateKey);

    if (decoded)
      return {
        message: "Logado!",
        status: 200,
      };

    return {
      message: "Inavlido",
      status: 401,
    };
  }
}
