import jwt from "jsonwebtoken";
import { User } from "./models/userModel";
import { Request, Response, NextFunction } from "express";

//The purpose of this function is to generate a JWT based on the user information provided as an argument.

//The first argument of jwt.sign() is an object that contains the data to be included in the JWT's payload. In this case, it includes the user's _id, name, email, and isAdmin properties.

//The second argument is the secret key used to sign the token. The process.env.JWT_SECRET ?? "secretjsontokenpassword" part ensures that the secret key is taken from the environment variable JWT_SECRET. If JWT_SECRET is not set (e.g., null or undefined), it falls back to the string "secretjsontokenpassword".

//The third argument is an options object that can be used to configure various aspects of the JWT. In this case, it sets the token's expiration time to "30d", indicating that the token will be valid for 30 days.

//In summary, the generateToken function takes a user object as input and creates a JWT containing the user's information as the payload. It uses a secret key, either from the JWT_SECRET environment variable or a fallback value if the environment variable is not set. The token is signed using the secret key, and an expiration time of 30 days is set for the token. The function returns the generated JWT as the output.

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET ?? "secretjsontokenpassword",
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET || "secretjsontokenpassword"
    );
    req.user = decode as {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      token: string;
    };
    next();
  } else {
    res.status(401).send({ message: "Token is not supplied" });
  }
};
