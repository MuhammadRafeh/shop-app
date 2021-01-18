import { combineReducers } from "redux";
import PRODUCTS from "../data/dummy-data";
import CartItem from "../models/cart-item";
import { addToCart, ADD_TO_CART } from "./actions";

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
    cart: cartReducer
})

export default rootReducer
