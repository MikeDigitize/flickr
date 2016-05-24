import React, { Component } from "react";

// author, date_taken, description, link, published

export default class FlickrImage extends Component {
    render() {
        return(
            <div className="flickr-img-holder">
                <img className="flickr-img" src={ this.props.src } />
            </div>
        );
    }
}