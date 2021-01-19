export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';


export const addToCart = (product) => {
  //Product is a object of class Product which has many properties
  return { type: ADD_TO_CART, payload: product };
};

export const removeFromCart = productId => { //It's a integer/number
  return {
    type: REMOVE_FROM_CART,
    payload: productId
  }
}
