import React from "react";

const FlickrImage = props => <a href={ props.link }><img className="flickr-img" src={ props.src } /></a>;
export default FlickrImage;