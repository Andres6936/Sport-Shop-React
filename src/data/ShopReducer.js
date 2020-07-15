import {ActionsTypes} from "./Types";

/**
 * Reducers are required to create and return new objects that
 * incorporate any required changes. If the action type isn’t
 * recognized, the reducer must return the data store object it
 * received unchanged. This reducer handles the DATA_LOAD action
 * by creating a new object with all the properties of the old store
 * plus the new data received in the action.
 *
 * The total property will contain the value of the X-Total-Count header,
 * which I will use to create the pagination navigation controls.
 *
 * The params property will contain the parameters used to make the
 * request, which I will use to determine when the user has made a
 * change that requires an HTTP request for more data.
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
                [action.payload.dataType]: action.payload.data,
                [`${action.payload.dataType}_total`]: action.payload.total,
                [`${action.payload.dataType}_params`]: action.payload.params,
            };
        default:
            return storeData || {};
    }
}