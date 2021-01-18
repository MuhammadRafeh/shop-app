export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = (product) => {
  //Product is a object of class Product which has many properties
  return { type: ADD_TO_CART, payload: product };
};
