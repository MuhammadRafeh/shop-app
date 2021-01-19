import { combineReducers } from "redux";
import PRODUCTS from "../data/dummy-data";
import CartItem from "../models/cart-item";
import Order from "../models/order";
import { addToCart, ADD_ORDERS, ADD_TO_CART, REMOVE_FROM_CART } from "./actions";

//Orders initial State and Reducer
const initialStateOrder = {
    orders: []
}

const orderReducer = (state = initialStateOrder, action) => {
    switch (action.type) {
        case ADD_ORDERS:
            //payload is {items:..., amount:...}
            const newOrder = new Order(
                new Date().toString(),
                action.payload.items,
                action.payload.amount,
                new Date()
            );
            return {
                // ...state,
                orders: state.orders.concat(newOrder)
            }
        default:
            return state
    }
}

//Cart initial State and Reducer
const initialStateCart = {
    items: {}, //key will be the product id and value will be CartItem object
    totalAmount: 0
}

const cartReducer = (state = initialStateCart, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const actionProduct = action.payload;
            if (state.items[actionProduct.id]) {
                return {
                    // ...state,
                    items: {
                        ...state.items,
                        [actionProduct.id]: new CartItem(state.items[actionProduct.id].quantity + 1,
                            actionProduct.price,
                            actionProduct.title,
                            state.items[actionProduct.id].sum + actionProduct.price)
                    },
                    totalAmount: state.totalAmount + actionProduct.price
                }
            } else {
                return {
                    // ...state, 
                    items: {
                        ...state.items,
                        [actionProduct.id]: new CartItem(1,
                            actionProduct.price,
                            actionProduct.title,
                            actionProduct.price)
                    },
                    totalAmount: state.totalAmount + actionProduct.price
                }
            }
        case REMOVE_FROM_CART:
            //action.payload is Id
            const selectedCartItem = state.items[action.payload]; //CartItem
            if (selectedCartItem.quantity === 1) {
                const newItems =  {...state.items}
                delete newItems[action.payload]
                return {
                    // ...state,
                    items: newItems,
                    totalAmount: state.totalAmount - selectedCartItem.productPrice
                }
            } else {
                return {
                    // ...state,
                    items: {
                        ...state.items,
                        [action.payload]: new CartItem(
                            selectedCartItem.quantity - 1, 
                            selectedCartItem.productPrice,
                            selectedCartItem.productTitle,
                            selectedCartItem.sum - selectedCartItem.productPrice
                            )
                    },
                    totalAmount: state.totalAmount - selectedCartItem.productPrice
                }
            }
        case ADD_ORDERS:
            return initialStateCart
        default:
            return state;
    }
}

//Product Initial State and Reducer
const initialStateProduct = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

const productsReducer = (state = initialStateProduct, action) => {
    return state
}

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: orderReducer
})

export default rootReducer
