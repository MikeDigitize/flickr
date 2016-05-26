import { getFlickrJson } from "../utils/get-flickr-json";
import { loadImages, filterImages } from "../utils/general";
import "../utils/object-assign-polyfill";

export const RETRIEVEDATA = "RETRIEVEDATA";
export function getFlickrImages(tag) {
    let flickrData;
    return dispatch => {
        getFlickrJson(tag).then(function (data) {
            flickrData = data;
            return loadImages(data.items);
        }).then(function(images) {
            let data = Object.assign({}, flickrData, {
                items : filterImages(images, flickrData.items)
            });
            dispatch(dataLoaded(data));
        })
    }
}

export const DATALOADED = "DATALOADED";
export function dataLoaded(data) {
    return { data, type : DATALOADED }
}

export const IMAGECLICKED = "IMAGECLICKED";
export function imageSelected(data) {
    return { data, type : IMAGECLICKED }
}
