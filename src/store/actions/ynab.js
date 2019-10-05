export const YNAB_SET_ACCESS_TOKEN = "YNAB_SET_ACCESS_TOKEN";
export const YNAB_LOGIN = "YNAB_LOGIN";
export const YNAB_LOGIN_PENDING = "YNAB_LOGIN_PENDING";
export const YNAB_LOAD_BUDGETS = "YNAB_LOAD_BUDGET";
export const YNAB_SET_BUDGETS = "YNAB_SET_BUDGETS";
export const YNAB_SEND_TRANSACTIONS = "YNAB_SEND_TRANSACTIONS";
export const YNAB_ADD_IMPORT_RESULT = "YNAB_ADD_IMPORT_RESULT";

export function setBudgets(budgets) {
    return {type: YNAB_SET_BUDGETS, budgets};
}

export function loadBudgets() {
    return {type: YNAB_LOAD_BUDGETS};
}

export function login(accessToken) {
    return {type: YNAB_LOGIN, accessToken};
}

export function setAccessToken(accessToken) {
    return {type: YNAB_SET_ACCESS_TOKEN, accessToken};
}

export function loginPending(loginPending) {
    return {type: YNAB_LOGIN_PENDING, loginPending};
}

export function sendTransations() {
    return {type: YNAB_SEND_TRANSACTIONS};
}

export function addImportResult(budget, result) {
    return {type: YNAB_ADD_IMPORT_RESULT, budget, result, successful: true};
}