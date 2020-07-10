import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {ShopConnector} from "./shop/ShopConnector";
import {SportStoreDataStore} from "./data/DataStore";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

export default class App extends Component {

    render() {
        return <Provider store={SportStoreDataStore}>
            <Router>
                <Switch>
                    <Route path="/shop" component={ShopConnector} />
                    <Redirect to="/shop" />
                </Switch>
            </Router>
        </Provider>
    }
}
