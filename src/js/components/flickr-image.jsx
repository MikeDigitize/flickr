import React, { Component } from "react";
import Store from "../store/flickr-store";
import { imageSelected } from "../actions/flickr-actions";
import { containsSelected } from "../utils/general";

// author, date_taken, description, link, published

export default class FlickrImage extends Component {

    constructor(props) {
        super();
        let { src } = props;
        this.state = {
            src,
            isSelected : false
        };
        Store.subscribe(this.onStoreUpdate.bind(this));
    }

    onStoreUpdate() {
        let { selected } = Store.getState().flickr;
        let isSelected = containsSelected(selected, this.state.src);
        this.setState({
            isSelected
        });
    }

    static onImageClick(evt) {
        let target = evt.target || evt.srcElement;
        Store.dispatch(imageSelected(target.src));
    }

    render() {
        let imageClass = this.state.isSelected ? "flickr-img selected" : "flickr-img";
        return(
            <img className={ imageClass } src={ this.state.src } onClick={ FlickrImage.onImageClick }/>
        );
    }
}