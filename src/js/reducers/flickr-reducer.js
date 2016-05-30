import "../utils/object-assign-polyfill";
import { DATALOADED, WINDOWWIDTHCHANGE, UNABLETOCONNECTTOFLICKR, ADDSELECTED, REMOVESELECTED } from "../actions/flickr-actions";
import { saveToLocalStorage, removeFromSelected } from "../utils/general";

let initialState = {
    loading : true,
    flickrData : { items: [] },
    tag : "london",
    selected : [],
    loadingMessage : "Please wait... loading"
};

export default function flickrReducer(state = initialState, action = {}) {
    let selected;
    switch(action.type) {

        case DATALOADED :
            return Object.assign({}, state, {
                loading : false,
                flickrData : action.data.flickrData,
                loadingMessage : action.data.flickrData.title,
                selected : action.data.selected
            });

        case UNABLETOCONNECTTOFLICKR :
            return Object.assign({}, state, {
                loading : false,
                loadingMessage : "Sorry, we can't connect to Flickr right now, please try again later"
            });

        case ADDSELECTED :
            selected = state.selected.concat(action.data);
            saveToLocalStorage(selected);
            return Object.assign({}, state, {
                selected
            });

        case REMOVESELECTED :
            selected = state.selected.filter(selected => {
                return selected.media.m !== action.data.media.m
            });
            saveToLocalStorage(selected);
            return Object.assign({}, state, {
                selected
            });

        case WINDOWWIDTHCHANGE :
            return state;

        default :
            return state;
    }
}