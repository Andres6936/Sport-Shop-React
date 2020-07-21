import React, {Component} from "react";
import {OrdersRow} from "./OrdersRow";
import {PaginationControls} from "../shop/PaginationControls";

/**
 * The OrdersTable component displays the total number of orders
 * and renders a table where responsibility for each row is delegated
 * to the OrdersRow component.
 *
 * @property totalSize {int} Total size of orders
 */
export class OrdersTable extends Component {

    render() {
        return <div>
            <h4 className="bg-info text-white text-center p-2">
                {this.props.totalSize} Orders
            </h4>

            <PaginationControls key={["ID", "Name"]}
                {...this.props} />

            <table className="table table-sm table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th className="text-right">Total</th>
                        <th className="text-center">Shipped</th>
                    </tr>
                </thead>
                <tbody>
                    { this.props.orders.map(order =>
                        <OrdersRow key={order.id}
                            order={order} toggleShipped={() =>
                            this.props.toggleShipped(order.id, !order.shipped)}/>) }
                </tbody>
            </table>
        </div>
    }
}