import {CSV_ADD_ACCOUNTS} from "../actions/csv";
import {IMPORT_FINISHED} from "../actions/general";

function addAccounts(state, accounts) {
    return {...state, accounts: [...state.accounts, ...accounts]}
}

export function csv(state = {accounts: []}, action) {
    switch (action.type) {
        case CSV_ADD_ACCOUNTS:
            return addAccounts(state, action.accounts);
        case IMPORT_FINISHED:
            return {accounts: []};
        default:
            return state;
    }
}