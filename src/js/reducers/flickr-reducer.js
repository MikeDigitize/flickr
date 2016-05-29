import "../utils/object-assign-polyfill";
import { DATALOADED, IMAGECLICKED, WINDOWWIDTHCHANGE, UNABLETOCONNECTTOFLICKR } from "../actions/flickr-actions";
import { containsSelected, removeSelected, saveToLocalStorage } from "../utils/general";

let initialState = {
    loading : true,
    flickrData : { items: [] },
    tag : "london",
    selected : [],
    loadingMessage : "Please wait... loading"
};

export default function flickrReducer(state = initialState, action = {}) {
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
        case IMAGECLICKED :
            let imageSrc = action.data;
            let selected = containsSelected(state.selected, imageSrc) ? removeSelected(state.selected, imageSrc) : state.selected.concat(imageSrc);
            saveToLocalStorage(selected);
            return Object.assign({}, state, { selected });
        case WINDOWWIDTHCHANGE :
            return state;
        default :
            return state;
    }
}