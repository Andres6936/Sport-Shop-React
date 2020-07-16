import {ActionsTypes, DataTypes} from "./Types";
import {RestDataSource} from "./RestDataSource";

const dataSource = new RestDataSource();

export const loadData = (dataType, params) => ({
    type: ActionsTypes.DATA_LOAD,
    payload: dataSource.GetData(dataType, params)
        .then(response =>
            ({
                dataType,
                data: response.data,
                total: Number(response.headers["x-total-count"]),
                params
           }))
})

export const setPageSize = (newSize) =>
    ({type: ActionsTypes.DATA_SET_PAGESIZE, payload: newSize});

export const setSortProperty = (newProp) =>
    ({type: ActionsTypes.DATA_SET_SORT_PROPERTY, payload: newProp});

export const placeHolder = (order) => ({
    type: ActionsTypes.DATA_STORE,
    payload: dataSource.StoreData(DataTypes.ORDERS, order)
        .then(response => ({
            dataType: DataTypes.ORDERS, data: response.data,
        }))
})