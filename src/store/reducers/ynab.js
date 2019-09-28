import {YNAB_LOGIN_PENDING, YNAB_SET_ACCESS_TOKEN, YNAB_SET_BUDGETS} from "../actions/ynab";

function accessToken(action) {
    return action.accessToken;
}

function loginPending(action) {
    return action.loginPending;
}

function budgets(action) {
    return action.budgets;
}

export function ynab(state = {}, action) {
    switch (action.type) {
        case YNAB_SET_ACCESS_TOKEN:
            return {...state, accessToken: accessToken(action)};
        case YNAB_LOGIN_PENDING:
            return {...state, loginPending: loginPending(action)};
        case YNAB_SET_BUDGETS:
            return {...state, budgets: budgets(action)};
        default:
            return state;
    }
}