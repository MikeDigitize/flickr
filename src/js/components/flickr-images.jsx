import React, { Component } from "react";
import FlickrImage from "./flickr-image";
import BootstrapWrapper from "./bootstrap-wrapper";

export default class FlickrImages extends Component {

    createImages() {
        let props = this.props.flickrData.items.map((data, i) => {
            let { author, date_taken, description, link, published } = data;
            let { width, height, m } = data.media;
            return {
                author,
                date_taken,
                description,
                link,
                published,
                width,
                height,
                src : m
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