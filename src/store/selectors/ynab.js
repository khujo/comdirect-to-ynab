export const accessToken = state => state.ynab.accessToken;
export const loginPending = state => state.ynab.loginPending;
export const budgets = state => state.ynab.budgets;
export const budget = (state, budgetId) => state.ynab.budgets.find(budget => budget.id === budgetId);
export const importFinished = state => state.ynab.importFinished;
export const importResults = state => state.ynab.importResults;