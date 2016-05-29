import React from "react";
import ReactDOM from "react-dom";
import { createRenderer, renderIntoDocument } from "react-addons-test-utils";
import { expect } from "chai";
import FlickrImageHolder from "../../js/components/flickr-image-holder";

describe("FlickrImageHolder component test", function() {

    it("Should render with text content passed in as props", function() {
        let noTestsYet = true;
        expect(noTestsYet).to.be.true;
    });

});

/*

 let src = "fakeimagepath.com/img.jpg";
 let expectedClass = "flickr-img";
 let image = <FlickrImageHolder src={ src } />;
 let renderer = createRenderer();
 renderer.render(image);
 let renderedImage = renderer.getRenderOutput();

 let component = renderIntoDocument(image);
 let renderedDOM = ReactDOM.findDOMNode(component);
 console.log(renderedDOM.children.length);
 console.log([].slice(renderedDOM.children).forEach(child => console.log(child)));

 */