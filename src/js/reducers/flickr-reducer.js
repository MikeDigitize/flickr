import "../utils/object-assign-polyfill";
import { DATALOADED } from "../actions/flickr-api-actions";

let initialState = {
    loading : true,
    flickrData : { items: [] },
    tag : "london"
};

export default function flickrReducer(state = initialState, action = {}) {
    switch(action.type) {
        case DATALOADED :
            return Object.assign({}, state, {
                loading : false,
                flickrData : action.data
            });
        default :
            return state;
    }
}