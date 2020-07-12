import {createStore, applyMiddleware} from "redux";
import {CartReducer} from "./CartReducer";
import {ShopReducer} from "./ShopReducer";
import {asyncActions} from "./AsyncMiddleware";
import {CommonReducer} from "./CommonReducer";

/**
 * The applyMiddleware is used to wrap the middleware so that it receives the actions,
 * and the result is passed as an argument to the createStore function that creates the
 * data store.
 *
 * The effect is that the asyncActions function will be able to inspect all of the actions
 * sent to the data store and seamlessly deal with those with a Promise payload.
 */
export const SportStoreDataStore =
    createStore(CommonReducer(ShopReducer, CartReducer),
        applyMiddleware(asyncActions));