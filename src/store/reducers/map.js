import {ADD_MAPPING} from "../actions/map";

export function map(state = {}, action) {
    switch (action.type) {
        case ADD_MAPPING:
            return Object.assign({}, state, action.mapping);
        default:
            return state;
    }
}