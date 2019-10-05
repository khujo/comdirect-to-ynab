import React, {useState, useEffect} from "react";
import {ynab} from "./store/reducers/ynab";

function AccountRow({account, budgets, addMapping}) {
    const [budget, setBudget] = useState(budgets[0]);
    const [ynabAccount, setYnabAccount] = useState(null);

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
        setYnabAccount(null);
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

    return <div className="row">
        <div className="col">{account.name}</div>
        <div className="col form-group">
            <label>
                Budget
                <select className="form-control" id="exampleFormControlSelect1" onChange={handleBudgetChanged} value={budget.id}>
                    {budgets.map(budget => <option value={budget.id} key={budget.id}>{budget.name}</option>)}
                </select>
            </label>
        </div>
        <div className="col form-group">
            <label>
                Account
                <select className="form-control" id="exampleFormControlSelect1" value={ynabAccount ? ynabAccount.id : "-"} onChange={handleAccountChanged}>
                    <option value="-" >-</option>
                    {budget.accounts.map(account => <option value={account.id} key={account.id}>{account.name}</option>)}
                </select>
            </label>
    </div>
    </div>
}

export default AccountRow;