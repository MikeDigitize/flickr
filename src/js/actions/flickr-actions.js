import { getFlickrJson } from "../utils/get-flickr-json";
import { loadImages, addImageDimensionsToData, getFromLocalStorage, findInFlickrData } from "../utils/general";
import "../utils/object-assign-polyfill";

export const RETRIEVEDATA = "RETRIEVEDATA";
export function getFlickrImages(tag) {

    let flickrData;

    // get favourited images saved in local storage
    let savedData = getFromLocalStorage();

    return dispatch => {
        getFlickrJson(tag).then(function (data) {

            // store data from flickr
            flickrData = data;

            // check to see which from the saved images are in the data from flickr
            let inFlickrData = savedData.filter(selected => {
                return !!findInFlickrData(flickrData.items, selected.media.m).length;
            });

            // find images that aren't in the data from flicr
            let notInData = savedData.filter(selected => {
                return !findInFlickrData(inFlickrData, selected.media.m).length;
            });

            // append items that aren't in the data from flickr so they still appear
            data.items = notInData.concat(data.items);

            // load all the images into cache
            return loadImages(data.items);

        }).then(function(images) {

            // add width and height to image data to assist with rendering
            let data = Object.assign({}, flickrData, {
                items : addImageDimensionsToData(images, flickrData.items)
            });
            let result = {
                flickrData : data,
                selected : savedData
            };

            // dispatch modified data and saved data to store
            dispatch(dataLoaded(result));

        }).catch(function (err) {
            dispatch(unableToConnectToFlickr());
        });
    }
}

export function updateSelected(selected, isSelected) {
    return dispatch => {
        isSelected ? dispatch(removeSelected(selected)) : dispatch(addSelected(selected));
    }
}

export const DATALOADED = "DATALOADED";
export function dataLoaded(data) {
    return { data, type : DATALOADED };
}

export const UNABLETOCONNECTTOFLICKR = "UNABLETOCONNECTTOFLICKR";
export function unableToConnectToFlickr() {
    return { type : UNABLETOCONNECTTOFLICKR };
}

export const ADDSELECTED = "ADDSELECTED";
export function addSelected(data) {
    return { data, type : ADDSELECTED };
}

export const REMOVESELECTED = "REMOVESELECTED";
export function removeSelected(data) {
    return { data, type : REMOVESELECTED };
}

export const WINDOWWIDTHCHANGE = "WINDOWWIDTHCHANGE";
export function windowWidthChange() {
    return { type : WINDOWWIDTHCHANGE };
}
