import React, {Component} from "react";

export class CartDetailsRows extends Component {

    handleChange = (product, event) => {
        this.props.updateQuantity(product, event.target.value);
    }

    /**
     * The render method must return a single top-level element, which is
     * inserted into the HTML in place of the component’s element when the
     * HTML document is produced.
     *
     * It isn’t always possible to return a single HTML element without
     * disrupting the content layout, such as in this example, where multiple
     * table rows are required.
     *
     * For these situations, the React.Fragment element is used. This element
     * is discarded when the content is processed and the elements it contains
     * are added to the HTML document.
     *
     * @returns {*} a single top-level element.
     */
    render() {
        if (!this.props.cart || this.props.cart.length === 0) {
            return <tr>
                <td colSpan="5">Your cart is empty</td>
            </tr>
        } else {
            return <React.Fragment>
                {this.props.cart.map(item =>
                <tr key={item.product.id}>
                    <td>
                        <input type="number" value={item.quantity}
                            onChange={(ev) => this.handleChange(item.product, ev)}/>
                    </td>
                    <td>{item.product.name}</td>
                    <td>${item.product.price.toFixed(2)}</td>
                    <td>${(item.quantity * item.product.price).toFixed(2)}</td>
                    <td>
                        <button className="btn btn-sm btn-danger"
                            onClick={() => this.props.removeFromCart(item.product)}>
                            Remove
                        </button>
                    </td>
                </tr>
                )}
                <tr>
                    <th colSpan="3" className="text-right">Total:</th>
                    <th colSpan="2">${this.props.cartPrice.toFixed(2)}</th>
                </tr>
            </React.Fragment>
        }
    }
}