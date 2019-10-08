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
            <h1 className="text-center">comdirect to YNAB</h1>
            {!showAccounts && !showResults && !showCSVDropZone ? <div className="row mt-5">
                <div className="col-lg-2" />
                <div className="col-lg-8">
                    <p>
                        comdirect to YNAB parses CSV files exported from your comdirect accounts and imports your financial transactions to YNAB.
                        In order to do so, you have to login using your YNAB account and grant this site write access to your YNAB account.
                        To do so, use the button below. After that, drop the file you want to import to the highlighted area.
                    </p>
                    <h5>Tip</h5>
                    <p>
                        You can export the transactions from all your accounts at once. Drop this file here and choose the account at YNAB you want to import the transactions to.
                    </p>
                    <div className="text-center mt-5">
                        <YNABLoginButton/>
                    </div>
                </div>
                <div className="col-lg-2" />
            </div> : null }
            <div className="row mt-5">
                <div className="col-lg-2" />
                <div className="col-lg-8">
                    {showCSVDropZone ? <CSVDropZone/> : null}
                    {accounts.map(account => <YNABAccountRow account={account} key={account.id} />)}
                    {showAccounts ? <div className="text-right mt-3"><YNABSendToYNABButton /></div> : null}
                </div>
                <div className="col-lg-2" />
            </div><
            div className="row mt-5">
                <div className="col-lg-2" />
                <div className="col-lg-8">
                    {showResults ? results.map((result, i) =>
                        <div className={`alert ${result.successful ? 'alert-success' : 'alert-danger'}`} key={i}>
                            <h4 className="alert-heading">{getBudget(result.budget).name}</h4>
                            { result.successful &&
                                <>
                                    <p>Imported {result.result.data.transaction_ids.length} new transactions.</p>
                                    {result.result.data.duplicate_import_ids.length > 0 &&
                                        <>
                                            <hr />
                                            <p>{result.result.data.duplicate_import_ids.length} transactions has been imported before and are ignored.</p>
                                        </>
                                    }
                                    {result.futureTransactions > 0 &&
                                        <>
                                            <hr />
                                            <p>Did not import {result.futureTransactions} transaction with a future date.</p>
                                        </>
                                    }
                                </>
                            }
                            { !result.successful &&
                                <>
                                    <p>Error while importing transactions.</p>
                                </>
                            }
                        </div>
                    ) : null}
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
                        Data obtained from the YNAB API will not knowingly be passed to any third party.
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
