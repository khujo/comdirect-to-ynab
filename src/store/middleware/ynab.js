import * as ynab from 'ynab';
import {loginPending, setAccessToken, setBudgets, YNAB_LOAD_BUDGETS, YNAB_LOGIN} from "../actions/ynab";

function login(dispatch, accessToken) {
    dispatch(loginPending(true));
    let ynabClient = new ynab.API(accessToken);
    return ynabClient.user.getUser().then(() => {
        dispatch(setAccessToken(accessToken));
        dispatch(loginPending(false));
        return ynabClient;
    }).catch(() => {
        dispatch(setAccessToken(null));
        dispatch(loginPending(false));
        return null;
    })
}

function loadBudgets(dispatch, ynabClient) {
    return ynabClient.budgets.getBudgets().then(response => {
        dispatch(setBudgets(response.data.budgets));
    });
}

export const ynabMiddleware = ({dispatch}) => {
    let ynabClient;
    return next => action => {
        if(action.type === YNAB_LOGIN) {
            return login(dispatch, action.accessToken).then(result => {ynabClient = result});
        }
        if(action.type === YNAB_LOAD_BUDGETS) {
            return loadBudgets(dispatch, ynabClient);
        }
        return next(action);
    }
};