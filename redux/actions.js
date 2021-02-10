export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_ORDERS = 'ADD_ORDERS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';

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

export const addProduct = (title, description, price, imageUrl) => {
  return async dispatch => { //dispatch will pass by redux-thunk
    //Async Code
    const response = await fetch('https://shop-app-4c3e7-default-rtdb.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        price,
        imageUrl
      })
    });
    const resData = await response.json();
    console.log(resData)
    dispatch({
      type: ADD_PRODUCT,
      payload: {
        id: resData.name,
        title,
        description,
        price,
        imageUrl
      }
    });
  }
}

  export const updateProduct = (id, title, description, imageUrl) => {
    return {
      type: UPDATE_PRODUCT,
      payload: {
        id,
        title,
        description,
        imageUrl
      }
    }
  }
