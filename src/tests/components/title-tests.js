import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import { expect } from "chai";
import Title from "../../js/components/title";

describe("Title component test", function() {
    let renderComponent = TestUtils.renderIntoDocument(<Title title="Title Component Test"/>);
    it("Should be awesome", function() {
        let renderedComponent = TestUtils.findRenderedDOMComponentWithTag(
            renderComponent, "h1"
        );
        expect(renderedComponent.textContent).to.equal("Title Component Test");
    });
});