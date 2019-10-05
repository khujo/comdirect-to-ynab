import React from "react";

function SendToYNABButton({sendToYNAB}) {
    return <button type="button" className="btn btn-primary text" onClick={sendToYNAB} >Send to YNAB</button>
}

export default SendToYNABButton;