import React, { Component } from "react";
import { createReactKey } from "../utils/general";

/**
 * BootstrapWrapper() returns a React component that wraps component functions / classes in Bootstrap rows and columns
 *
 * It's not too smart so define column classes in numbers divisible by 12 e.g. col-sm-2,3,4,6 (the amount of Bootstrap columns in its grid)
 *
 * Example usage:
 * let heading = props => <h1>{ props.greet } this is a simple stateless component</h1>;
 * let Wrapped = BootstrapWrapper(heading, "col-sm-3 col-md-4");
 * <Wrapped greet="Hi"/>
 *
 * Outputs: <div><section class="row"><div class="col-sm-3 col-md-4"><h1>Hello his is a simple stateless component</h1></div></section></div>
 *
 * @param { Array of or single Function or Class } WrappedComponents
 * @param { String } bootstrapClass
 * @param { Array (optional) } propsToAssign
 * @return { Function } (React Component)
 *
 */

const BootstrapWrapper = (ComponentsToWrap, bootstrapClass, propsToAssign = []) => class Wrapper extends Component {

    static createRowsOfComponents() {
        let rows = [];
        let start = 0;
        let amount = 12 / Wrapper.getColumnCount(bootstrapClass);
        let end = amount;

        while(start < ComponentsToWrap.length) {
            rows.push(ComponentsToWrap.slice(start, end));
            start += amount;
            end += amount;
            if(end > ComponentsToWrap.length) {
                end = ComponentsToWrap.length;
            }
        }
        return rows;
    }

    static getColumnSizes(bootstrapClass) {
        return bootstrapClass.match(/xs-(\w+-)?\d+|sm-(\w+-)?\d+|md-(\w+-)?\d+|lg-(\w+-)?\d+|xl-(\w+-)?\d+/gi) || [];
    }

    static removeOffsetClass(bootstrapClasses) {
        return bootstrapClasses
            .map(cls => cls.replace("offset", "").split("-"))
            .map(cls => cls.filter(cls => cls));
    }

    static sortLowestToHighest(a, b) {
        return Number(a[1]) - Number(b[1]);
    }

    static sortByColumnSize(bootstrapClasses) {

        let xs = bootstrapClasses.filter(cls => cls[0] === "xs").sort((a, b) => Wrapper.sortLowestToHighest(a, b));
        let sm = bootstrapClasses.filter(cls => cls[0] === "sm").sort((a, b) => Wrapper.sortLowestToHighest(a, b));
        let md = bootstrapClasses.filter(cls => cls[0] === "md").sort((a, b) => Wrapper.sortLowestToHighest(a, b));
        let lg = bootstrapClasses.filter(cls => cls[0] === "lg").sort((a, b) => Wrapper.sortLowestToHighest(a, b));
        let xl = bootstrapClasses.filter(cls => cls[0] === "xl").sort((a, b) => Wrapper.sortLowestToHighest(a, b));

        return [].concat(xs, sm, md, lg, xl).pop();

    }

    static getColumnCount(bootstrapClass) {
        let bootstrapClasses = Wrapper.getColumnSizes(bootstrapClass);
        let classes = Wrapper.removeOffsetClass(bootstrapClasses);
        return Number(Wrapper.sortByColumnSize(classes)[1]);
    }

    static createRows(components, rowIndex, props) {
        rowIndex = rowIndex * 12 / Wrapper.getColumnCount(bootstrapClass);
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
        let rowsOfComponents = Wrapper.createRowsOfComponents();
        //return (
        //    <div>{ rowsOfComponents.map((component, rowIndex) => Wrapper.createRows(component, rowIndex, this.props)) }</div>
        //);
        return (
            <div className="row">
                { ComponentsToWrap.map((component, index) => Wrapper.createColumns(component, Array.isArray(this.props) ? this.props[index] : this.props, index ))}
            </div>
        );
    }

};

export default BootstrapWrapper;