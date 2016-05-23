import React from "react";
import ReactDOM from "react-dom";
import { renderIntoDocument, findRenderedDOMComponentWithTag, createRenderer } from "react-addons-test-utils";
import { expect } from "chai";
import Title from "../../js/components/title";

describe("Title component test", function() {

    let text = "Title Component Test";
    let title = <Title title={ text } />;
    let renderComponent = renderIntoDocument(title);

    it("Should render with text content passed in as props", function() {
        let renderedTitle = findRenderedDOMComponentWithTag(
            renderComponent, "h1"
        );
        expect(renderedTitle.textContent).to.equal(text);
    });

});