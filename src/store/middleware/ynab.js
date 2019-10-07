import * as ynab from 'ynab';
import {
    addImportResult,
    loginPending,
    setAccessToken,
    setBudgets,
    YNAB_LOAD_BUDGETS,
    YNAB_LOGIN,
    YNAB_SEND_TRANSACTIONS
} from "../actions/ynab";
import {getMapping} from "../selectors/map";
import {findAccount} from "../selectors/csv";
import {importFinished} from "../actions/general";

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
        let budgets = response.data.budgets.slice();
        budgets.sort((a, b) => new Date(b['last_modified_on']).getTime() - new Date(a['last_modified_on']).getTime());
        Promise.all(budgets.map(budget => ynabClient.accounts.getAccounts(budget.id)))
            .then(accountsResponse => {
                accountsResponse
                    .forEach((accountsResponse, i) => budgets[i].accounts = accountsResponse.data.accounts.filter(account => !account.closed));
                dispatch(setBudgets(budgets));
            });
    });
}

function getBudget(budgets, budgetId) {
    let budget = budgets[budgetId];
    if (!budget) {
        budgets[budgetId] = {
            id: budgetId,
            accounts: []
        }
    }
    return budgets[budgetId];
}

function mapToBudgets(mapping) {
    let budgets = {};
    for (let csvAccount in mapping) {
        if (!mapping[csvAccount].account) {
            continue;
        }
        let budget = getBudget(budgets, mapping[csvAccount].budget);
        budget.accounts.push({csv: csvAccount, ynab: mapping[csvAccount].account});
    }
    return budgets;
}

function cropPayeeName(name) {
    if(name === null || name.length <= 50) {
        return name;
    }
    return name.substr(0, 50);
}

function mapValue(value) {
    return parseInt((value * 1000).toFixed(0));
}

function mapTransaction(transaction, accountId, transactionCache) {
    let amountOfSimilarTransactions = transactionCache.filter(t => t.valueDate.getTime() === transaction.valueDate.getTime() && t.value === transaction.value).length;
    transactionCache.push(transaction);
    return {
        'account_id': accountId,
        date: transaction.valueDate,
        amount: mapValue(transaction.value),
        'payee_name': cropPayeeName(transaction.payee.name),
        memo: transaction.text,
        cleared: 'cleared',
        'import_id': `comdirect:${mapValue(transaction.value)}:${transaction.valueDate.toISOString().substr(0, 10)}:${amountOfSimilarTransactions}`
    }
}

function mapTransactions(listOfAccounts, state, transactionCache) {
    let allTransactions = [];
    for(let accounts of listOfAccounts) {
        let csvAccount = findAccount(state, accounts.csv);
        let transactions = csvAccount.transactions.map(transaction => mapTransaction(transaction, accounts.ynab, transactionCache));
        transactions.forEach(transaction => allTransactions.push(transaction));
    }
    return allTransactions;
}

function sendTransactions(state, ynabClient, dispatch) {
    let budgets = mapToBudgets(getMapping(state));
    let transactionCache = [];
    let imports = [];
    for (let budget in budgets) {
        let transactions = mapTransactions(budgets[budget].accounts, state, transactionCache);
        let promise = ynabClient.transactions.createTransactions(budget, {transactions})
            .then(result => dispatch(addImportResult(budget, result)));
        imports.push(promise);
    }
    Promise.all(imports).then(() => dispatch(importFinished()));
}

export const ynabMiddleware = ({dispatch, getState}) => {
    let ynabClient;
    return next => action => {
        switch (action.type) {
            case YNAB_LOGIN:
                return login(dispatch, action.accessToken).then(result => {ynabClient = result});
            case YNAB_LOAD_BUDGETS:
                return loadBudgets(dispatch, ynabClient);
            case YNAB_SEND_TRANSACTIONS:
                return sendTransactions(getState(), ynabClient, dispatch);
            default:
                return next(action);
        }
    }
};