import {ADD_MAPPING} from "../actions/map";
import {IMPORT_FINISHED} from "../actions/general";

export function map(state = {}, action) {
    switch (action.type) {
        case ADD_MAPPING:
            return Object.assign({}, state, action.mapping);
        case IMPORT_FINISHED:
            return {};
        default:
            return state;
    }
}