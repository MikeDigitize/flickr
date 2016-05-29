import React from "react";
import { createRenderer } from "react-addons-test-utils";
import { expect } from "chai";
import FlickrLoadingStatus from "../../js/components/flickr-loading-status";

describe("FlickrLoadingStatus component test", function() {

    let text = "FlickrLoadingStatus Component Test";
    let status = <FlickrLoadingStatus title={ text } />;
    let renderer = createRenderer();
    renderer.render(status);

    it("Should render as a H4 tag with a nested EM tag with text content passed in from props", function() {
        let renderedStatus = renderer.getRenderOutput();
        expect(renderedStatus.type).to.equal("h4");
        expect(renderedStatus.props.children.type).to.equal("em");
        expect(renderedStatus.props.children.props.children).to.equal(text);
    });

});