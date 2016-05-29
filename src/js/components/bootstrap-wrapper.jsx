import React, { Component } from "react";
import { createReactKey } from "../utils/general";

const BootstrapWrapper = (ComponentsToWrap, bootstrapClass, propsToAssign = []) => class Wrapper extends Component {

    static createColumns (Component, props, index) {
        return (
            <div className={ bootstrapClass } key={ createReactKey() + index }>
                <Component {...props} />
            </div>
        );
    }

    render() {
        if(!Array.isArray(ComponentsToWrap)) {
            ComponentsToWrap = [ComponentsToWrap];
        }
        if(!Object.keys(this.props).length) {
            this.props = propsToAssign;
        }
        return (
            <div className="row">
                {
                    ComponentsToWrap
                        .map((component, index) =>
                            Wrapper.createColumns(component, Array.isArray(this.props) ? this.props[index] : this.props, index)
                        )
                }
            </div>
        );
    }

};

export default BootstrapWrapper;