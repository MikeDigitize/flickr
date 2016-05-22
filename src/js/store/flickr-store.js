import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import flickrReducer from "../reducers/flickr-reducer";

function Reducer(state = {}, action = {}) {
    return {
        flickr : flickrReducer(state.flickr, action)
    }
}

let Store = applyMiddleware(thunk)(createStore)(Reducer);
export default Store;