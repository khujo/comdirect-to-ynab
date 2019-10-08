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
            <h1 className="text-center">comdirect YNAB Transaction Import</h1>
            <div className="text-center">
                <YNABLoginButton/>
            </div>
            <br />
            <div className="row">
                <div className="col-lg-2" />
                <div className="col-lg-8">
                    {showCSVDropZone ? <CSVDropZone/> : null}
                    {accounts.map(account => <YNABAccountRow account={account} />)}
                    {showAccounts ? <div className="text-right mt-3"><YNABSendToYNABButton /></div> : null}
                    {showResults ? results.map((result, i) => <li key={i}>{getBudget(result.budget).name} - successful: {result.successful ? 'yes' : 'no'} - new transactions: {result.result.data.transaction_ids.length} - ignored transactions: {result.result.data.duplicate_import_ids.length}</li>) : null}
                </div>
                <div className="col-lg-2" />
            </div>
            <div className="row mt-5">
                <div className="col-lg-2" />
                <div className="col-lg-8">
                    <h6>Privacy Policy</h6>
                    <p className="small">
                        This website reads financial transactions from CSV files exported from the comdirect Bank and sends those transactions to YNAB using their <a href="https://api.youneedabudget.com/">API</a>.
                        The CSV files are parsed in the browser and are thus not sent to any server. The transactions read from the files are send to the YNAB servers when you click "Send to YNAB".
                        Please refer to the <a href="https://www.youneedabudget.com/privacy-policy/">YNAB Privacy Policy</a> for further information.
                    </p>
                    <p className="small">
                        This site is hosted using GitHub Pages. GitHub may save technical information, including your IP address. Please refer to the <a href="https://help.github.com/en/articles/github-privacy-statement">GitHub Privacy Policy</a>.
                    </p>
                </div>
                <div className="col-lg-2" />
            </div>
        </div>
    );
}

export default App;
