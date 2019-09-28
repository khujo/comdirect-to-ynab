import React from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import YNABLoginButton from "./containers/YNABLoginButton";
import CSVDropZone from "./containers/CSVDropZone";

function App({accessToken}) {
    return (
        <div className="container">
            <h1 className="text-center">Comdirect YNAB Transaction Import</h1>
            <div className="text-center">
                <YNABLoginButton/>
            </div>
            {accessToken ? <CSVDropZone/> : null}

        </div>
    );
}

export default App;
