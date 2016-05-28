import React, { Component } from "react";
import Store from "../store/flickr-store";
import { getFlickrImages } from "../actions/flickr-actions";
import Title from "./title";
import FlickrImages from "./flickr-images";
import BootstrapWrapper from "./bootstrap-wrapper";
import { getColumnInfo } from "../utils/general";

export default class FlickrApp extends Component {

    constructor() {
        super();
        let { loading, flickrData, tag } = Store.getState().flickr;
        this.state = {
            loading,
            flickrData,
            tag,
            unsubscribe : Store.subscribe(this.onStoreUpdate.bind(this))
        };
        getColumnInfo("col-xs-12, col-lg-3 col-xl-offset-5 col-xl-2, col-xs-3, col-sm-6, col-xs-9 col-xs-1");
    }

    componentDidMount() {
        Store.dispatch(getFlickrImages(this.state.tag));
    }

    onStoreUpdate() {
        let { loading, flickrData } = Store.getState().flickr;
        this.setState({
            loading,
            flickrData
        }, () => {
            this.state.unsubscribe();
        });
    }

    render() {
        let FlickrTitle = BootstrapWrapper(Title, 12, "sm");
        return (
            <div>
                <FlickrTitle title={ this.state.loading ? "Please wait... loading" : this.state.flickrData.title } />
                <FlickrImages flickrData={ this.state.flickrData } onImageClick={ this.onImageClick } />
            </div>
        )
    }

}