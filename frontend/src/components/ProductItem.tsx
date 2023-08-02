import type { Product } from "../types/Products";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Rating from "./Ratings";
import { Store } from "../store";
import { useContext } from "react";
import { CartItem } from "../types/Carts";
import { convertProductToCartItem } from "../utils";
import { toast } from "react-toastify";

function ProductItem({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = (item: CartItem) => {
    //This line searches for an existing item in the cartItems array. The .find() method is used to look through the array and find the first element that satisfies the condition specified in the arrow function (x) => x._id === item._id. It checks if the _id property of the current element (x) is equal to the _id property of the item parameter.
    const existItem = cartItems.find((x) => x._id === item._id);
    //This line sets the quantity variable. If an existing item was found (existItem is truthy), it calculates the new quantity by adding 1 to the quantity property of the existItem. If no existing item was found, it sets the quantity to 1, indicating that this is the first occurrence of this item in the cart.
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    toast.success("Product added to the cart");
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default ProductItem;
