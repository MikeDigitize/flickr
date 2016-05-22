import React, { Component } from "react";

const BootstrapWrapper = (ComposedComponent, columns) => class extends Component {
    render() {
        return (
            <section className="row">
                <div className={ columns }>
                    <ComposedComponent {...this.props} />
                </div>
            </section>
        );
    }
};

export default BootstrapWrapper;