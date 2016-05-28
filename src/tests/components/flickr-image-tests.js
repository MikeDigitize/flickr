import React from "react";
import { createRenderer, renderIntoDocument } from "react-addons-test-utils";
import { expect } from "chai";
import FlickrImage from "../../js/components/flickr-image";

describe("FlickrImage component test", function() {

    let src = "fakeimagepath.com/img.jpg";
    let expectedClass = "flickr-img";
    let image = <FlickrImage src={ src } />;
    let renderer = createRenderer();
    renderer.render(image);
    let renderedImage = renderer.getRenderOutput();

    it("Should render with text content passed in as props", function() {

        let noTestsYet = true;
        expect(noTestsYet).to.be.true;
    });

});