import { User } from "./models/userModel";
import { Product } from "./models/productModel";
import bcrypt from "bcryptjs";

export const sampleProducts: Product[] = [
  {
    name: "nike slim shirt",
    slug: "nike-slim-shirt",
    category: "shirts",
    image: "/images/p1.jpg",
    price: 120,
    countInStock: 10,
    brand: "nike",
    rating: 4.5,
    numReviews: 10,
    description: "high quality product",
  },
  {
    name: "adidas fit shirt",
    slug: "adidas-fit-shirt",
    category: "shirts",
    image: "/images/p2.jpg",
    price: 100,
    countInStock: 20,
    brand: "adidas",
    rating: 4.0,
    numReviews: 10,
    description: "high quality product",
  },
  {
    name: "lacoste free shirt",
    slug: "lacoste-free-shirt",
    category: "shirts",
    image: "/images/p3.jpg",
    price: 220,
    countInStock: 0,
    brand: "lacoste",
    rating: 4.8,
    numReviews: 17,
    description: "high quality product",
  },
  {
    name: "nike slim pants",
    slug: "nike-slim-pants",
    category: "pants",
    image: "/images/p4.jpg",
    price: 78,
    countInStock: 15,
    brand: "nike",
    rating: 4.5,
    numReviews: 14,
    description: "high quality product",
  },
];

export const sampleUsers: User[] = [
  {
    name: "Joe",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: true,
  },
  {
    name: "John",
    email: "user@example.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: false,
  },
];
