import React, {Component} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import {loadData} from "../data/ActionsCreators";
import {DataTypes} from "../data/Types";
import {Shop} from './Shop'
import {addToCart, updateCartQuantity, removeFromCart, clearCart} from "../data/CartActionCreators";

const mapStateToProps = (dataStore) => ({
    ...dataStore
})

const mapDispatchToProps = {
    loadData, addToCart, updateCartQuantity, removeFromCart, clearCart
}

const filterProducts = (products = [], category) =>
    (!category || category === "All")
    ? products : products.filter( p => p.category.toLowerCase() === category.toLowerCase());

export const ShopConnector = connect(mapStateToProps, mapDispatchToProps)(
    class extends Component {

        /**
         * The path prop tells the Route to wait until the
         * browser navigates to the /shop/products URL. If there
         * is an additional segment in the URL, such as
         * /shop/products/running, then the contents of that segment
         * will be assigned to a parameter named category, which is
         * how the user’s category selection will be determined.
         *
         * When the browser navigates to a URL that matches the path
         * prop, the Route displays the content specified by the
         * render prop.
         *
         * This is the point at which the data store and the URL
         * routing features are combined.
         */
        render() {
            return <Switch>
                <Route path="/shop/products/:category?"
                    render={(routerProps) =>
                        <Shop {...this.props} {...routerProps}
                            products={filterProducts(this.props.products,
                            routerProps.match.params.category)}/>} />
                <Redirect to="/shop/products"/>
            </Switch>
        }

        /**
         * The ShopConnector component uses the componentDidMount
         * method to load the data into the data store.
         *
         * The componentDidMount method is part of the React
         * component lifecycle.
         */
        componentDidMount() {
            this.props.loadData(DataTypes.CATEGORIES);
            this.props.loadData(DataTypes.PRODUCTS);
        }
    }
)