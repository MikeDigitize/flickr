import React from "react";
import { createRenderer } from "react-addons-test-utils";
import { expect } from "chai";
import FlickrText from "../../js/components/flickr-text";

describe("FlickrText component test", function() {

    let text = "FlickrText Component Test";
    let className = "flickr-text";
    let fText = <FlickrText title={ text } textClass={ className } text={ text } />;
    let renderer = createRenderer();
    renderer.render(fText);

    it("Should render as a p tag with a class and text content passed in from props", function() {
        let renderedText = renderer.getRenderOutput();
        expect(renderedText.type).to.equal("p");
        expect(renderedText.props.children).to.equal(text);
        expect(renderedText.props.className).to.equal(className);
        expect(renderedText.props.title).to.equal(text);
    });

});