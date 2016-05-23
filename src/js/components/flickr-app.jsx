import React, { Component } from "react";
import Store from "../store/flickr-store";
import { getFlickrImages } from "../actions/flickr-api-actions";
import Title from "./title";
import FlickrImages from "./flickr-images";

export default class FlickrApp extends Component {

    constructor() {
        super();
        let { loading, flickrData, tag } = Store.getState().flickr;
        this.state = {
            loading,
            flickrData,
            tag
        };
        Store.subscribe(this.onStoreUpdate.bind(this));
    }

    componentDidMount() {
        Store.dispatch(getFlickrImages(this.state.tag));
    }

    onStoreUpdate() {
        let { loading, flickrData } = Store.getState().flickr;
        this.setState({
            loading,
            flickrData
        });
    }

    render() {
        return (
            <div>
                <Title title={ this.state.loading ? "Please wait... loading" : this.state.flickrData.title } />
                <FlickrImages flickrData={ this.state.flickrData } />
            </div>
        )
    }

}