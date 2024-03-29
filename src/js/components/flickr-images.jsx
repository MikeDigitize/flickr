import React, { Component } from "react";
import FlickrImageHolder from "./flickr-image-holder";
import BootstrapWrapper from "./bootstrap-wrapper";

export default class FlickrImages extends Component {

    createImages() {
        let props = this.props.flickrData.items.map((data, i) => {
            let { author, date_taken, description, link } = data;
            let { width, height, m } = data.media;
            return { author, date_taken, description, link, width, height, src : m };
        });
        let images = this.props.flickrData.items.map(() => FlickrImageHolder);
        return BootstrapWrapper(images, "col-sm-6 col-md-4 col-lg-3", props);
    }

    render() {
        if(!this.props.flickrData.items.length) {
            return false;
        }
        let Images = this.createImages();
        return (<Images />);
    }

}