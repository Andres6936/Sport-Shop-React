import {ActionsTypes} from "./Types";

export const addToCart = (product, quantity) => ({
    type: ActionsTypes.CART_ADD,
    payload: {
        product,
        quantity: quantity || 1
    }
})

export const updateCartQuantity = (product, quantity) => ({
    type: ActionsTypes.CART_UPDATE,
    payload: {product, quantity},
})

export const removeFromCart = (product) => ({
    type: ActionsTypes.CART_REMOVE,
    payload: product,
})

export const clearCart = () => ({
    type: ActionsTypes.CART_CLEAR,
})