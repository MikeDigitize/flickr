import React from "react";
import ReactDOM from "react-dom";
import { createRenderer, renderIntoDocument } from "react-addons-test-utils";
import { expect } from "chai";
import BootstrapWrapper from "../../js/components/bootstrap-wrapper";

describe("Bootstrap Wrapper test", function() {

    it("A single component should be wrapped in a bootstrap row and column with props passed into the returned component", function () {

        let text = "Bootstrap Wrapper test";
        let bootstrapClass = "col-md-4";
        let ComponentWithProps = props => <h1>{ props.text }</h1>;
        let Wrapper = BootstrapWrapper(ComponentWithProps, bootstrapClass);
        let component = renderIntoDocument(<Wrapper text={ text }/>);
        let renderedComponent = ReactDOM.findDOMNode(component);
        expect(renderedComponent.className).to.equal("row");
        expect(renderedComponent.children[0].className).to.equal(bootstrapClass);

    });

    it("An array of components should be wrapped in a bootstrap row and columns with props passed in as an argument", function () {

        let text = "Bootstrap Wrapper test";
        let bootstrapClass = "col-sm-3";
        let ComponentWithProps = props => <h1>{ props.text }</h1>;
        let componentArray = [];
        let props = [];

        for(let i = 0; i < 12; i++) {
            componentArray.push(ComponentWithProps);
            props.push({ text })
        }

        let Wrapper = BootstrapWrapper(componentArray, bootstrapClass, props);
        let component = renderIntoDocument(<Wrapper />);
        let renderedComponent = ReactDOM.findDOMNode(component);
        let h1s = renderedComponent.querySelectorAll("h1");
        let columns = renderedComponent.querySelectorAll(`.${ bootstrapClass }`);
        expect(h1s).to.have.lengthOf(12);
        expect(columns).to.have.lengthOf(12);
        [].slice.call(h1s).forEach(h1 => expect(h1.parentNode.className).to.equal(bootstrapClass));
        [].slice.call(h1s).forEach(h1 => expect((h1.innerText || h1.textContent)).to.equal(text));

    });

});