import React, {useState, useEffect} from "react";
import Fuse from "fuse.js";

function findBestMatch(account, budget) {
    let fuse = new Fuse(budget.accounts, {
        keys: ['name'],
        tokenize: true,
        threshold: 1.0
    });

    let searchResults = fuse.search(account.name.replace(/[^\w\s]/g, ' ') + "comdirect");
    return searchResults.length > 0 ? searchResults[0] : null;
}

function AccountRow({account, budgets, addMapping}) {
    const [budget, setBudget] = useState(budgets[0]);
    const [ynabAccount, setYnabAccount] = useState(findBestMatch(account, budget));

    useEffect(() => {
        addMapping({
            [account.id]: {
                account: ynabAccount ? ynabAccount.id : null,
                budget: budget.id
            }
        });
    }, [budget, ynabAccount]);

    function handleBudgetChanged(event) {
        let budgetId = event.target.value;
        let newBudget = budgets.find(b => b.id === budgetId);
        setBudget(newBudget);
        setYnabAccount(findBestMatch(account, newBudget));
    }

    function handleAccountChanged(event) {
        let accountId = event.target.value;
        if(accountId === "-") {
            setYnabAccount(null);
            return;
        }
        let newAccount = budget.accounts.find(a => a.id === accountId);
        setYnabAccount(newAccount);
    }

    return <div className="row mt-3" style={{backgroundColor: '#f4f4f4'}}>
        <div className="col-12 h1">{account.name}</div>
        <div className="col-sm form-group">
            <label>Budget</label>
            <select className="form-control" id="exampleFormControlSelect1" onChange={handleBudgetChanged} value={budget.id}>
                {budgets.map(budget => <option value={budget.id} key={budget.id}>{budget.name}</option>)}
            </select>
        </div>
        <div className="col-sm form-group">
            <label>Account</label>
            <select className="form-control" id="exampleFormControlSelect1" value={ynabAccount ? ynabAccount.id : "-"} onChange={handleAccountChanged}>
                <option value="-" >-</option>
                {budget.accounts.map(account => <option value={account.id} key={account.id}>{account.name}</option>)}
            </select>
        </div>
    </div>
}

export default AccountRow;