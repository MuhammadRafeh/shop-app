import { combineReducers } from "redux";
import PRODUCTS from "../data/dummy-data";
import CartItem from "../models/cart-item";
import Order from "../models/order";
import Product from "../models/product";
import { addToCart, ADD_ORDERS, ADD_PRODUCT, ADD_TO_CART, DELETE_PRODUCT, REMOVE_FROM_CART, UPDATE_PRODUCT } from "./actions";

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
                const newItems = { ...state.items }
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
        case DELETE_PRODUCT:
            //payload is a id
            if (!state.items[action.payload]) return state;
            const updatedItems = { ...state.items };
            delete updatedItems[action.payload]
            return {
                items: updatedItems,
                totalAmount: state.totalAmount - state.items[action.payload].sum
            };
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
    switch (action.type) {
        case ADD_PRODUCT:
            const newProduct = new Product(
                action.payload.id,
                'u1',
                action.payload.title,
                action.payload.imageUrl,
                action.payload.description,
                action.payload.price
            )
            return {
                ...state,
                availableProducts: [...state.availableProducts, newProduct],
                userProducts: [...state.userProducts, newProduct]
            }
        case UPDATE_PRODUCT:
            const userProductIndex = state.userProducts.findIndex(prod => prod.id === action.payload.id);
            const availableProductsIndex = state.availableProducts.findIndex(prod => prod.id === action.payload.id);
            const updatedProduct = new Product(
                action.payload.id,
                state.userProducts[userProductIndex].ownerId,
                action.payload.title,
                action.payload.imageUrl,
                action.payload.description,
                state.userProducts[userProductIndex].price,
            )
            const updatedUserProducts = [...state.userProducts]
            updatedUserProducts[userProductIndex] = updatedProduct;
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductsIndex] = updatedProduct;
            return {
                // ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }

        case DELETE_PRODUCT:
            return {
                // ...state,
                availableProducts: state.availableProducts.filter(product => product.id !== action.payload),
                userProducts: state.userProducts.filter(product => product.id !== action.payload)
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: orderReducer
})

export default rootReducer
