import React, { Component } from "react";
import Store from "../store/flickr-store";
import { imageSelected, windowWidthChange } from "../actions/flickr-actions";
import { containsSelected, getWindowWidth, getHolderHeight, debounce } from "../utils/general";
import FlickrImage from "./flickr-image";
import FlickrText from "./flickr-text";

export default class FlickrImageHolder extends Component {

    constructor(props) {
        super();
        let { src, author, date_taken, link, width, height } = props;
        let holderHeight = FlickrImageHolder.getHolderHeight();
        this.state = {
            src,
            author,
            date_taken,
            link,
            width,
            height,
            holderHeight,
            isSelected : false
        };
        Store.subscribe(this.onStoreUpdate.bind(this));
    }

    componentDidMount() {
        let onResize = debounce(function() {
            Store.dispatch(windowWidthChange());
        }, 100);
        window.addEventListener("resize", onResize);
    }

    onStoreUpdate() {
        let { selected } = Store.getState().flickr;
        let isSelected = containsSelected(selected, this.state.src);
        let holderHeight = FlickrImageHolder.getHolderHeight();
        this.setState({
            isSelected,
            holderHeight
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.holderHeight !== nextState.holderHeight || this.state.isSelected !== nextState.isSelected;
    }

    calculateImageDimensions() {
        return { width : `${this.state.width}px`, top : `${((this.state.holderHeight - this.state.height) / 2)}px` }
    }

    static onImageClick(evt) {
        let target = evt.target || evt.srcElement;
        Store.dispatch(imageSelected(target.src));
    }

    static extractAuthorName(author) {
        let authorText = author.match(/\((.*)\)/)[1].replace(/\((.*)\)/g, "");
        return authorText.length >= 20 ? `${authorText.substr(0,17)}...` : authorText;
    }

    static getDateTaken(date) {
        let dateTaken = new Date(date);
        return `${dateTaken.getDate()}/${dateTaken.getMonth() + 1}/${dateTaken.getFullYear()}`;
    }

    static getHolderHeight() {
        return getHolderHeight(getWindowWidth());
    }

    render() {
        let holderClass = this.state.isSelected ? "flickr-data-holder selected" : "flickr-data-holder";
        return(
            <div className={ holderClass }>
                <div className="flickr-image-holder">
                    <FlickrImage dimensions={ this.calculateImageDimensions() } src={ this.state.src } onImageClick={ FlickrImageHolder.onImageClick } />
                </div>
                <div className="flickr-image-data">
                    <FlickrText textClass="flickr-author" text={ `Author: ${FlickrImageHolder.extractAuthorName(this.state.author)}` } />
                    <FlickrText textClass="flickr-date-taken" text={ `Date taken: ${FlickrImageHolder.getDateTaken(this.state.date_taken)}` } />
                </div>
            </div>
        );
    }

}