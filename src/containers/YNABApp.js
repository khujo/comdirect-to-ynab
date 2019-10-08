import {accessToken, budget, importFinished, importResults} from "../store/selectors/ynab";
import {connect} from "react-redux";
import App from "../App";
import {accounts} from "../store/selectors/csv";

let mapStateToProps = state => ({
    accessToken: accessToken(state),
    accounts: accounts(state),
    results: importResults(state),
    getBudget: bugetId => budget(state, bugetId),
    showAccounts: accounts(state).length > 0 && !importFinished(state),
    showCSVDropZone: accessToken(state) && accounts(state).length === 0,
    showResults: importFinished(state)
});

const YNABApp = connect(mapStateToProps)(App);

export default YNABApp;