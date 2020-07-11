import React, {Component} from 'react';
import {Link} from 'react-router-dom';

/**
 * The component receives the data it requires through cartItems and
 * cartPrice props, which are used to create a summary of the component,
 * along with a Link that will navigate to the /shop/cart URL when clicked.
 *
 * The Link is disabled when the value of the items prop is zero to prevent
 * the user from progressing without selecting at least one product.
 */
export class CartSummary extends Component {

    getSummary = () => {
        if (this.props.cartItems > 0) {
            return <span>
                {this.props.cartItems} item(s),
                ${this.props.cartPrice.toFixed(2)}
            </span>
        } else {
            return <span>Your cart: (empty)</span>
        }
    }

    getLinkClasses = () => {
        return `btn btn-sm bg-dark text-white
        ${this.props.cartItems === 0 ? "disable": ""}`
    }

    render () {
        return <div className="float-rigth">
            <small>
                {this.getSummary()}
                <Link className={this.getLinkClasses()}
                    to="/shop/cart">
                    <i className="fa fa-shopping-cart"/>
                </Link>
            </small>
        </div>
    }
}