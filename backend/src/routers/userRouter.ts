import express, { Request, Response } from "express";
import asyncHandler = require("express-async-handler");
import bcrypt from "bcryptjs";
import { User, UserModel } from "../models/userModel";
import { generateToken } from "../utils";

export const userRouter = express.Router();
//POST /api/users/signin
//The asyncHandler is a custom middlewarethat handles asynchronous errors in route handlers. It wraps the entire route handler in an asynchronous function and catches any errors that occur during the execution of the route handler.

userRouter.post(
  "/signin",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

//POST /api/users/signup
//await UserModel.create(...):Inside the route handler, a new user is CREATED IN THE DATABASE using the UserModel.create() method, which is a Mongoose model representing the user schema.The user information is obtained from the request body, where req.body contains the user's name, email, and password.The password is hashed using bcrypt.hashSync before saving it to the database for security purposes.
//const token = generateToken(user);:AFTER SUCCESSFULLY CREATING THE USER in the database, a JSON web token (JWT) is GENERATED for the user. The generateToken() function is likely a utility function that takes the user object as input and returns a JWT string.
//res.send({ ... }):Finally, the route handler sends the response to the client.The response contains the user information, including _id, name, email, and isAdmin, and the JWT token generated for the user during signu
userRouter.post(
  "/signup",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    } as User);

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);
