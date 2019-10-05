import React from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import YNABLoginButton from "./containers/YNABLoginButton";
import CSVDropZone from "./containers/CSVDropZone";
import YNABAccountRow from "./containers/YNABAccountRow";
import YNABSendToYNABButton from "./containers/YNABSendToYnabButton";

function App({accounts, results, showCSVDropZone, showAccounts, showResults, getBudget}) {

    return (
        <div className="container">
            <h1 className="text-center">Comdirect YNAB Transaction Import</h1>
            <div className="text-center">
                <YNABLoginButton/>
            </div>
            {showCSVDropZone ? <CSVDropZone/> : null}
            {accounts.map(account => <YNABAccountRow account={account} />)}
            {showAccounts ? <div className="text-right"><YNABSendToYNABButton /></div> : null}
            {showResults ? <ul>
                {results.map((result, i) => <li key={i}>{getBudget(result.budget).name} - successful: {result.successful ? 'yes' : 'no'} - new transactions: {result.result.data.transaction_ids.length} - ignored transactions: {result.result.data.duplicate_import_ids.length}</li>)}
            </ul> : null}
        </div>
    );
}

export default App;
