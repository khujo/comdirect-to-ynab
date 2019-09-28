import React from "react";

export const LoginButton = ({accessToken, loginPending, onClick}) => {
    if (accessToken) {
        return null;
    }
    let content = loginPending ?
        "Logging in ..." :
        "Login with YNAB";
    return <button type="button" className="btn btn-primary text" onClick={onClick} disabled={loginPending}>{content}</button>
};