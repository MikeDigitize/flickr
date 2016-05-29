import React from "react";
import ReactDOM from "react-dom";
import { createRenderer, Simulate, renderIntoDocument } from "react-addons-test-utils";
import { expect } from "chai";
import FlickrImage from "../../js/components/flickr-image";

describe("FlickrImage component test", function() {

    let dimensions = { width : "200px", top : "20px" };
    let src = "http://farm8.staticflickr.com/7125/27238119871_02c6dee132_m.jpg";
    let testCount = 0;
    let onImageClick = evt => testCount++;
    let image = <FlickrImage dimensions={ dimensions } src={ src } onImageClick={ onImageClick } />;
    let renderer = createRenderer();
    renderer.render(image);

    it("Should render as an IMG tag with a src, className and onClick handler passed in from props", function() {
        let renderedImage = renderer.getRenderOutput();
        expect(renderedImage.type).to.equal("img");
        expect(renderedImage.props.style).to.deep.equal(dimensions);
        expect(renderedImage.props.src).to.equal(src);
        expect(renderedImage.props.onClick).to.equal(onImageClick);
    });

    it("Should respond to a user click", function () {
        let component = renderIntoDocument(<div>{ image }</div>);
        let renderedComponent = ReactDOM.findDOMNode(component);
        expect(testCount).to.equal(0);
        Simulate.click(renderedComponent.children[0]);
        expect(testCount).to.equal(1);
        Simulate.click(renderedComponent.children[0]);
        expect(testCount).to.equal(2);
    });

});

