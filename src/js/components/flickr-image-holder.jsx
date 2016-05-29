import React, { Component } from "react";
import Store from "../store/flickr-store";
import { imageSelected } from "../actions/flickr-actions";
import { containsSelected } from "../utils/general";
import FlickrImage from "./flickr-image";
import FlickrText from "./flickr-text";

export default class FlickrImageHolder extends Component {

    constructor(props) {
        super();
        let { src, author, date_taken, link, width, height } = props;
        this.state = {
            src,
            author,
            date_taken,
            link,
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
        return { width : `${this.state.width}px`, top : `${((300 - this.state.height) / 2)}px` }
    }

    static onImageClick(evt) {
        let target = evt.target || evt.srcElement;
        Store.dispatch(imageSelected(target.src));
    }

    static extractAuthorName(author) {
        let authorText = author.match(/\((.*)\)/)[1].replace(/\((.*)\)/g, "");
        if(authorText.length >= 20) {
            authorText = `${authorText.substr(0,17)}...`;
        }
        console.log(authorText);
        return authorText;
    }

    static getDateTaken(date) {
        let dateTaken = new Date(date);
        return `${dateTaken.getDate()}/${dateTaken.getMonth() + 1}/${dateTaken.getFullYear()}`;
    }

    render() {
        let holderClass = this.state.isSelected ? "flickr-data-holder selected" : "flickr-data-holder";
        return(
            <div className={ holderClass }>
                <div className="flickr-image-holder">
                    <FlickrImage dimensions={ this.calculateDimensions() } src={ this.state.src } onImageClick={ FlickrImageHolder.onImageClick } />
                </div>
                <div className="flickr-image-data">
                    <FlickrText textClass="flickr-author" text={ `Author: ${FlickrImageHolder.extractAuthorName(this.state.author)}` } />
                    <FlickrText textClass="flickr-date-taken" text={ `Date taken: ${FlickrImageHolder.getDateTaken(this.state.date_taken)}` } />
                </div>
            </div>
        );
    }

}

/*

 */