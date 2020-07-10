import {ActionsTypes} from "./Types";

/**
 * Reducers are required to create and return new objects that
 * incorporate any required changes. If the action type isn’t
 * recognized, the reducer must return the data store object it
 * received unchanged. This reducer handles the DATA_LOAD action
 * by creating a new object with all the properties of the old store
 * plus the new data received in the action.
 *
 * @param storeData Data store
 * @param action Action to realize in the data
 * @returns {*|{}} Data reducer
 */
export const ShopReducer = (storeData, action) => {
    switch (action.type) {
        case ActionsTypes.DATA_LOAD:
            return {
                ...storeData,
                [action.payload.dataType]: action.payload.data
            };
        default:
            return storeData || {};
    }
}