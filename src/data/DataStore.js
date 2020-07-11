import {createStore} from "redux";
import {CartReducer} from "./CartReducer";
import {ShopReducer} from "./ShopReducer";
import {CommonReducer} from "./CommonReducer";

export const SportStoreDataStore = createStore(CommonReducer(ShopReducer, CartReducer));