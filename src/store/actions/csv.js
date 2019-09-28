export const CSV_ADD_ACCOUNTS = "CSV_ADD_ACCOUNTS";

export function addAccounts(accounts) {
    return {
        type: CSV_ADD_ACCOUNTS,
        accounts
    };
}