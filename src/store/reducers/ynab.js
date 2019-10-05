import {YNAB_ADD_IMPORT_RESULT, YNAB_LOGIN_PENDING, YNAB_SET_ACCESS_TOKEN, YNAB_SET_BUDGETS} from "../actions/ynab";
import {IMPORT_FINISHED} from "../actions/general";

function accessToken(action) {
    return action.accessToken;
}

function loginPending(action) {
    return action.loginPending;
}

function budgets(action) {
    return action.budgets;
}

function addImportResult(action) {
    let {successful, result, budget} = action;
    return {successful, result, budget};
}

export function ynab(state = {importResults: []}, action) {
    switch (action.type) {
        case YNAB_SET_ACCESS_TOKEN:
            return {...state, accessToken: accessToken(action)};
        case YNAB_LOGIN_PENDING:
            return {...state, loginPending: loginPending(action)};
        case YNAB_SET_BUDGETS:
            return {...state, budgets: budgets(action)};
        case YNAB_ADD_IMPORT_RESULT:
            return {...state, importResults: [...state.importResults, addImportResult(action)]};
        case IMPORT_FINISHED:
            return {...state, importFinished: true};
        default:
            return state;
    }
}