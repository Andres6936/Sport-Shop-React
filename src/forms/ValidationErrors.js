import React, {Component} from "react";

/**
 * Component that is used to display error messages.
 */
export class ValidationErrors extends Component {

    /**
     * @returns {null | HTMLHeadingElement} Element with a message of error.
     */
    render() {
        if (this.props.errors) {
            return this.props.errors.map(err =>
            <h6 className="text-danger" key={err}>
                {err}
            </h6>)
        }

        return null;
    }
}