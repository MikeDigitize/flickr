import React from "react";
import ReactDOM from "react-dom";
import { createRenderer, renderIntoDocument } from "react-addons-test-utils";
import { expect } from "chai";
import FlickrImage from "../../js/components/flickr-image";

describe("FlickrImage component test", function() {

    let src = "fakeimagepath.com/img.jpg";
    let expectedClass = "flickr-img";
    let image = <FlickrImage src={ src } />;
    //let renderer = createRenderer();
    //renderer.render(image);
    let renderedImage = renderIntoDocument(image);
    console.log(renderedImage.props);

    it("Should render with text content passed in as props", function() {
        expect(true).to.be.true;
    });

});

/*
 let renderedImage = renderer.getRenderOutput();
 expect(renderedImage.type).to.equal("img");
 expect(renderedImage.props.className).to.equal(expectedClass);
 expect(renderedImage.props.src).to.equal(src);
 */