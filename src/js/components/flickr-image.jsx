import React from "react";

const FlickrImage = props => <img className="flickr-image" style={ props.dimensions } src={ props.src } onClick={ props.onImageClick } />;
export default FlickrImage;