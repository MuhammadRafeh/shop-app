import { combineReducers } from "redux";
import PRODUCTS from "../data/dummy-data";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

const productsReducer = (state = initialState, action) => {
    return state
}

const rootReducer = combineReducers({
    products: productsReducer
})

export default rootReducer
