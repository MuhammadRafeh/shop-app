import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react/cjs/react.development";
import Product from "../models/product";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_ORDERS = 'ADD_ORDERS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_ORDERS = 'SET_ORDERS';
// export const SIGNUP = 'SIGNUP';
// export const SIGNIN = 'SIGNIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export const authenticate = (token, userId) => {
  return {
    type: AUTHENTICATE,
    payload: {
      userId,
      token
    }
  }
}

const setAsyncStorageUserData = (token, userId, expiresIn) => {
  const expiryDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000).toISOString();
  AsyncStorage.setItem('userData', JSON.stringify({
    token,
    userId,
    expiryDate
  }))
}

export const signin = (email, password) => {
  return async dispatch => {

    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTx9JvqK5eK8G7mbq9kKNRH-Yrzjwczew',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      })
    if (!response.ok) {
      // throw new Error('Something went wrong!');
      const resData = await response.json();
      let message = 'Something went wrong!';
      if (resData.error.message === 'EMAIL_NOT_FOUND') {
        message = 'Email not found!'
      }
      else if (resData.error.message === 'INVALID_PASSWORD') {
        message = 'Password is not Correct!'
      }
      else if (resData.error.message === 'USER_DISABLED') {
        message = 'User is currently Disabled'
      }

      throw new Error(message);

    }
    const resData = await response.json();
    console.log(resData);
    dispatch(authenticate(resData.idToken, resData.localId))
    setAsyncStorageUserData(resData.idToken, resData.localId, resData.expiresIn);
  }
}

export const signup = (email, password) => {
  return async dispatch => {

    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTx9JvqK5eK8G7mbq9kKNRH-Yrzjwczew',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      })
    if (!response.ok) {
      // throw new Error('Something went wrong!');
      const resData = await response.json();
      let message = 'Something went wrong!';
      if (resData.error.message === 'EMAIL_EXISTS') {
        message = 'Email already Exists!'
      }

      throw new Error(message);

    }
    const resData = await response.json();
    console.log(resData);
    dispatch(authenticate(resData.idToken, resData.localId))
    setAsyncStorageUserData(resData.idToken, resData.localId, resData.expiresIn);
  }
}

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(`https://shop-app-4c3e7-default-rtdb.firebaseio.com/orders/${userId}.json`)
    if (!response.ok) {
      throw new Error('Something went wrong.');
    }
    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: SET_ORDERS,
      payload: {
        orders: resData
      }
    });
  }
}

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
  return async (dispatch, prevState) => {
    const date = new Date();
    const state = prevState();
    const token = state.auth.token;
    const userId = state.auth.userId;
    const response = await fetch(`https://shop-app-4c3e7-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItem,
        totalAmount,
        date: date.toISOString()
      })
    });
    if (!response.ok) {
      throw new Error('Something went wrong.');
    }
    const responseData = response.json();
    dispatch({
      type: ADD_ORDERS,
      payload: {
        id: responseData.name,
        items: cartItem,
        amount: totalAmount,
        date
      }
    })
  }
}

export const deleteItem = productId => { // Take Id as a parameter
  return async (dispatch, prevState) => {
    const token = prevState().auth.token;
    const response = await fetch(`https://shop-app-4c3e7-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Something went wrong.');
    }
    dispatch({
      type: DELETE_PRODUCT,
      payload: productId
    })
  }
}

export const addProduct = (title, description, price, imageUrl) => {
  return async (dispatch, prevState) => { //dispatch will pass by redux-thunk
    //Async Code
    const state = prevState()
    const token = state.auth.token;
    const userId = state.auth.userId;
    const response = await fetch(`https://shop-app-4c3e7-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        price,
        imageUrl,
        ownerId: userId
      })
    });
    if (!response.ok) {
      throw new Error('Something went wrong.');
    }
    const resData = await response.json();
    console.log(resData)
    dispatch({
      type: ADD_PRODUCT,
      payload: {
        id: resData.name,
        title,
        description,
        price,
        imageUrl,
        ownerId: userId
      }
    });
  }
}

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, prevState) => {
    const token = prevState().auth.token;
    const response = await fetch(`https://shop-app-4c3e7-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`, {
      method: 'PATCH', //update the product while PUT Replaces the item with new 1.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl
      })
    })
    if (!response.ok) {
      throw new Error('Something went wrong.');
    }
    dispatch({
      type: UPDATE_PRODUCT,
      payload: {
        id,
        title,
        description,
        imageUrl
      }
    });
  }
}

export const fetchProducts = () => {

  return async (dispatch, getStore) => {
    const userId = getStore().auth.userId;
    try {
      const response = await fetch('https://shop-app-4c3e7-default-rtdb.firebaseio.com/products.json');

      if (!response.ok) {
        throw new Error('Something Went Wrong');
      };

      const resData = await response.json();
      console.log(resData);
      const listOfProduct = [];
      for (const key in resData) {
        listOfProduct.push(
          new Product(
            key,
            // 'u1',
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        )
      }
      dispatch({
        type: SET_PRODUCTS,
        payload: {
          listOfProduct,
          userProduct: listOfProduct.filter(product => product.ownerId === userId)
        }
      });
    } catch (err) {
      throw err;
    }

  }

}
