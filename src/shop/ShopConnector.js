import React, {Component} from 'react';
import {connect} from 'react-redux'
import {DataTypes} from "../data/Types";
import * as ShopActions from "../data/ActionsCreators";
import * as CartActions from "../data/CartActionCreators";
import {Shop} from './Shop'
import {DataGetter} from "../data/DataGetter";
import {CartDetails} from "./CartDetails";
import {Switch, Route, Redirect} from "react-router-dom";
import {Checkout} from "./Checkout";
import {Thanks} from "./Thanks";

const mapDispatchToProps = { ...ShopActions, ...CartActions };

export const ShopConnector = connect(ds => ds, mapDispatchToProps)(
    class extends Component {

        selectComponent = (routeProps) => {
            const wrap = (Component, Content) =>
                <Component {...this.props} {...routeProps} >
                    {Content && wrap(Content)}
                </Component>

            switch (routeProps.match.params.section) {
                case "products":
                    return wrap(DataGetter, Shop);
                case "cart":
                    return wrap(CartDetails);
                case "checkout":
                    return wrap(Checkout);
                case "thanks":
                    return wrap(Thanks);
                default:
                    return <Redirect to="/shop/products/all/1" />
            }
        }

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
                <Redirect from="/shop/products/:category"
                    to="/shop/products/:category/1" exact={true}/>
                <Route path="/shop/:section?/:category?/:page?"
                    render={routerProps => this.selectComponent(routerProps) } />
            </Switch>
        }

        /**
         * The ShopConnector component uses the componentDidMount
         * method to load the data into the data store.
         *
         * The componentDidMount method is part of the React
         * component lifecycle.
         */
        componentDidMount = ()  => this.props.loadData(DataTypes.CATEGORIES);
    }
)