import {RestUrls} from "./Urls";
import Axios from "axios";


export class RestDataSource {

    /**
     * This method uses Axios to send an HTTP request to the web service to
     * get all of the available objects for a specified data type.
     *
     * @param dataType Type of action to made in the data.
     *
     * @returns {Promise<any>} Promise that is resolved when the response is
     *  received from the web service.
     */
    GetData = (dataType) =>
        this.SendRequest("get", RestUrls[dataType]);

    SendRequest = (method, url) => Axios.request({method, url});
}