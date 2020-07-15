import {RestUrls} from "./Urls";
import Axios from "axios";


export class RestDataSource {

    /**
     * This method uses Axios to send an HTTP request to the web service to
     * get all of the available objects for a specified data type.
     *
     * @param dataType Type of action to made in the data.
     * @param params Request parameters, which will be used to request pages
     *  and specify a category
     *
     * @returns {Promise<any>} Promise that is resolved when the response is
     *  received from the web service.
     */
    GetData = async(dataType, params) =>
        this.SendRequest("get", RestUrls[dataType], params);

    SendRequest = (method, url, params) => Axios.request({method, url, params});
}