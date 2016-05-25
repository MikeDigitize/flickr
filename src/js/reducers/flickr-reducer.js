import "../utils/object-assign-polyfill";
import { DATALOADED, IMAGECLICKED } from "../actions/flickr-actions";
import { containsSelected, removeSelected } from "../utils/general";

let initialState = {
    loading : true,
    flickrData : { items: [] },
    tag : "london",
    selected : []
};

export default function flickrReducer(state = initialState, action = {}) {
    switch(action.type) {
        case DATALOADED :
            return Object.assign({}, state, {
                loading : false,
                flickrData : action.data
            });
        case IMAGECLICKED :
            let imageSrc = action.data;
            let selected = containsSelected(state.selected, imageSrc) ? removeSelected(state.selected, imageSrc) : state.selected.concat(imageSrc);
            return Object.assign({}, state, {
                selected
            });
        default :
            return state;
    }
}