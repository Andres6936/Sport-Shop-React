import {ActionsTypes} from "./Types";

/**
 * The reducer for the cart actions keeps track of the user’s product
 * selection by adding a cart property to the data store and assigning
 * it an array of objects that have product and quantity properties.
 *
 * There are also cartItems and cartPrice properties that keep track
 * of the number of items in the cart and their total price.
 *
 * @param storeData array of objects
 * @param action action to made in the array of objects
 * @returns {{cartPrice: number, cartItems: number, cart: []}|*|{}}
 */
export const CartReducer = (storeData, action) => {
    let newStore = {cart: [], cartItems: 0, cartPrice: 0, ...storeData}

    switch (action.type) {
        case ActionsTypes.CART_ADD:
            const p = action.payload.product;
            const q = action.payload.quantity;

            let existing = newStore.cart.find(item => item.product.id === p.id);
            if (existing) {
                existing.quantity += q;
            } else {
                newStore.cart = [...newStore.cart, action.payload];
            }

            newStore.cartItems += q;
            newStore.cartPrice += p.price * q;
            return newStore;

        case ActionsTypes.CART_UPDATE:
            newStore.cart = newStore.cart.map(item => {
                if (item.product.id === action.payload.product.id) {
                    const diff = action.payload.quantity - item.quantity;
                    newStore.cartItems += diff;
                    newStore.cartPrice += (item.product.price * diff);
                    return action.payload;
                } else {
                    return item;
                }
            });

            return newStore;

        case ActionsTypes.CART_REMOVE:
            let selection = newStore.cart.find(item =>
                item.product.id === action.payload.id);

            newStore.cartItems -= selection.quantity;
            newStore.cartPrice -= selection.quantity * selection.product.price;
            newStore.cart = newStore.cart.filter(item => item !== selection);

            return newStore;

        case ActionsTypes.CART_CLEAR:
            return {...storeData, cart: [], cartItems: 0, cartPrice: 0}

        default:
            return storeData || {};
    }
}