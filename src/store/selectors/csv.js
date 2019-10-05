export const accounts = state => state.csv.accounts;
export const findAccount = (state, accountId) => accounts(state).find(account => account.id === accountId);