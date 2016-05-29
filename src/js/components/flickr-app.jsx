import React, { Component } from "react";
import Store from "../store/flickr-store";
import { getFlickrImages } from "../actions/flickr-actions";
import FlickrLoadingStatus from "./flickr-loading-status";
import FlickrImages from "./flickr-images";
import BootstrapWrapper from "./bootstrap-wrapper";

export default class FlickrApp extends Component {

    constructor() {
        super();
        let { loading, flickrData, tag, loadingMessage } = Store.getState().flickr;
        this.state = { loading, flickrData, tag, loadingMessage, unsubscribe : Store.subscribe(this.onStoreUpdate.bind(this)) };
    }

    componentDidMount() {
        Store.dispatch(getFlickrImages(this.state.tag));
    }

    onStoreUpdate() {
        let { loading, flickrData, loadingMessage } = Store.getState().flickr;
        this.setState({ loading, flickrData, loadingMessage }, () => {
            this.state.unsubscribe();
        });
    }

    render() {
        let LoadingStatus = BootstrapWrapper(FlickrLoadingStatus, "col-sm-12");
        return (
            <div>
                <h1>Flickr Picker!</h1>
                <LoadingStatus title={ this.state.loadingMessage } />
                <FlickrImages flickrData={ this.state.flickrData } />
            </div>
        )
    }

}