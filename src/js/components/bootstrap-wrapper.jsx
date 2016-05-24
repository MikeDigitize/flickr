import React, { Component } from "react";
import { createReactKey } from "../utils/general";
import "../utils/object-assign-polyfill";

/**
 * BootstrapWrapper() returns a React component that wraps component functions / classes in Bootstrap rows and columns
 *
 * It's not too smart so define columns in numbers divisible by 12 (the amount of Bootstrap columns in its grid)
 *
 * Example usage:
 * let heading = props => <h1>{ props.greet } this is a simple stateless component</h1>;
 * let Wrapped = BootstrapWrapper(heading, 12, "sm");
 * <Wrapped greet="Hi"/>
 *
 * Outputs: <section class="row"><div class="col-sm-12"><h1>Hello his is a simple stateless component</h1></div></section>
 *
 * @param { Array of or single Function or Class } WrappedComponents
 * @param { Number } columns
 * @param { String } size
 * @param { Array (optional) } propsToAssign
 * @return { Function } (React Component)
 *
 */

const BootstrapWrapper = (WrappedComponents, columns, size, propsToAssign = []) => class Wrapper extends Component {

    static createRowsOfComponents() {
        let rows = [];
        let start = 0;
        let amount = 12 / columns;
        let end = amount;

        while(start < WrappedComponents.length) {
            rows.push(WrappedComponents.slice(start, end));
            start += amount;
            end += amount;
            if(end > WrappedComponents.length) {
                end = WrappedComponents.length;
            }
        }
        return rows;
    }

    static createRows(components, rowIndex, props) {
        rowIndex = rowIndex * 12 / columns;
        return (
            <section className="row" key={ createReactKey() + rowIndex }>
                {
                    components.map((component, componentIndex) => {
                        let componentProps = Array.isArray(props) ? props[componentIndex + rowIndex] : props;
                        return Wrapper.createColumns(component, componentProps, componentIndex + rowIndex)
                    })
                }
            </section>
        );
    }

    static createColumns (Component, props, index) {
        return (
            <div className={ `col-${size}-${columns}` } key={ createReactKey() + index }>
                <Component {...props} />
            </div>
        );
    }

    render() {
        if(!Array.isArray(WrappedComponents)) {
            WrappedComponents = [WrappedComponents];
        }
        if(!Object.keys(this.props).length) {
            this.props = propsToAssign;
        }
        let rowsOfComponents = Wrapper.createRowsOfComponents();
        return (
            <div>{ rowsOfComponents.map((component, rowIndex) => Wrapper.createRows(component, rowIndex, this.props)) }</div>
        );
    }
};

export default BootstrapWrapper;