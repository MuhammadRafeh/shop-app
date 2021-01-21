export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_ORDERS = 'ADD_ORDERS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

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

export const addOrders = (cartItem, totalAmount) => { //It's list of CartItems as first and total Amount int as 2nd argument
  return {
    type: ADD_ORDERS,
    payload: {
      items: cartItem,
      amount: totalAmount
    }
  }
}

export const deleteItem = productId => { // Take Id as a parameter
  return {
    type: DELETE_PRODUCT,
    payload: productId
  }
}
