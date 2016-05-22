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
    it("should be wrapped in a bootstrap row", function () {
        let renderer = createRenderer();
        renderer.render(title);
        let renderedTree = renderer.getRenderOutput();
        expect(renderedTree.type).to.equal("section");
        expect(renderedTree.props.className ).to.equal("row");
        expect(renderedTree.props.children.type).to.equal("div");
        expect(renderedTree.props.children.props.className).to.equal("col-sm-12");
        expect(renderedTree.props.children.props.children.props.title).to.equal(text);
    });
});