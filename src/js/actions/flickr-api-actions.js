import { getFlickrJson } from "../utils/get-flickr-json";

export const RETRIEVEDATA = "RETRIEVEDATA";
export function getFlickrImages(tag) {
    return dispatch => {
        getFlickrJson(tag).then(function (data) {
            dispatch(dataLoaded(data));
        });
    }
}

export const DATALOADED = "DATALOADED";
export function dataLoaded(data) {
    return { data, type : DATALOADED }
}
