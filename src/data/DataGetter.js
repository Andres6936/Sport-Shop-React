import React, {Component} from "react";
import {DataTypes} from "./Types";

/**
 * I need a component that can receive details of the current route and
 * its parameters and also access the data store.
 */
export class DataGetter extends Component {

    /**
     * This component renders the content its parent provides between the
     * start and end tags using the children props. This is useful for defining
     * components that provide services to the application but that don’t
     * present content to the user.
     */
    render() {
        return <React.Fragment>{this.props.children}</React.Fragment>
    }

    componentDidUpdate = () => this.getData();
    componentDidMount = () => this.getData();

    /**
     * In addition to the category and page number, which are taken from the URL,
     * the action is created with _sort and _limit parameters that order the results
     * and set the data size. The values used for sorting and for setting the page
     * size will be obtained from the data store.
     */
    getData = () => {
        const dsData = this.props.products_params || {};
        const rtData = {
            _limit: this.props.pageSize || 5,
            _sort: this.props.sortKey || "name",
            _page: this.props.match.params.page || 1,
            category_like: (this.props.match.params.category || "") === "all"
                ? "" : this.props.match.params.category,
        }

        if (Object.keys(rtData).find(key => dsData[key] !== rtData[key])) {
            this.props.loadData(DataTypes.PRODUCTS, rtData);
        }
    }
}
