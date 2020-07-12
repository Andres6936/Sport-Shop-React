import {ActionsTypes} from "./Types";
import {RestDataSource} from "./RestDataSource";

const dataSource = new RestDataSource();

export const loadData = (dataType) => ({
    type: ActionsTypes.DATA_LOAD,
    payload: dataSource.GetData(dataType)
        .then(response => ({dataType, data: response.data}))
})