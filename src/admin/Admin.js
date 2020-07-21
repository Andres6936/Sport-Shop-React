import React, {Component} from "react";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from "react-apollo";
import {GraphQlUrl} from '../data/Urls';
import {OrdersConnector} from "./OrdersConnector";

const graphQLClient = new ApolloClient({
    uri: GraphQlUrl
})

export class Admin extends Component {

    render() {
        return <ApolloProvider client={graphQLClient}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col bg-info text-white">
                        <div className="navbar-brand">Sports Store</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col p-2">
                        <OrdersConnector/>
                    </div>
                </div>
            </div>
        </ApolloProvider>
    }
}