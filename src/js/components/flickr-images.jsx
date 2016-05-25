import React, { Component } from "react";
import FlickrImage from "./flickr-image";
import BootstrapWrapper from "./bootstrap-wrapper";

export default class FlickrImages extends Component {

    createImages() {
        let props = this.props.flickrData.items.map((data, i) => {
            return {
                src: data.media.m,
                link: data.link
            };
        });
        let images = this.props.flickrData.items.map(() => FlickrImage);
        return BootstrapWrapper(images, 3, "md", props);
    }

    render() {
        if(!this.props.flickrData.items.length) {
            return false;
        }
        let Images = this.createImages();
        return (<Images />);
    }
}