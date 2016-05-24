import React from "react";
import { createRenderer } from "react-addons-test-utils";
import { expect } from "chai";
import Title from "../../js/components/title";

describe("Title component test", function() {

    let text = "Title Component Test";
    let title = <Title title={ text } />;
    let renderer = createRenderer();
    renderer.render(title);

    it("Should render with text content passed in as props", function() {
        let renderedTitle = renderer.getRenderOutput();
        expect(renderedTitle.type).to.equal("h1");
        expect(renderedTitle.props.children).to.equal(text);
    });

});