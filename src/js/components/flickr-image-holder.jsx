import React, { Component } from "react";
import Store from "../store/flickr-store";
import { imageSelected } from "../actions/flickr-actions";
import { containsSelected } from "../utils/general";

export default class FlickrImageHolder extends Component {

    constructor(props) {
        super();
        let { src, author, date_taken, link, published, width, height } = props;
        this.state = {
            src,
            author,
            date_taken,
            link,
            published,
            width,
            height,
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

    calculateDimensions() {
        return {
            width : `${this.state.width}px`,
            top : `${((300 - this.state.height) / 2)}px`
        }
    }

    static onImageClick(evt) {
        let target = evt.target || evt.srcElement;
        Store.dispatch(imageSelected(target.src));
    }

    render() {
        let imageClass = this.state.isSelected ? "flickr-img selected" : "flickr-img";
        return(
            <div>
                <div className="flickr-img-holder">
                    <img className={ imageClass } style={ this.calculateDimensions() } src={ this.state.src } onClick={ FlickrImageHolder.onImageClick } />
                </div>
            </div>
        );
    }
}

/*
 <div className="flickr-img-data">
 <p>{ this.state.date_taken }</p>
 <p>{ this.state.author }</p>
 <p>{ this.state.published }</p>
 </div>
 */