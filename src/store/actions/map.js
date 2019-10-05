export const ADD_MAPPING = "ADD_MAPPING";

export function addMapping(mapping) {
    return {
        type: ADD_MAPPING,
        mapping
    }
}