import {sendTransations} from "../store/actions/ynab";
import {connect} from "react-redux";
import SendToYNABButton from "../SendToYNABButton";

function mapDispatchToProps(dispatch) {
    return {
        sendToYNAB: () => dispatch(sendTransations())
    }
}

const YNABSendToYNABButton = connect(null, mapDispatchToProps)(SendToYNABButton);

export default YNABSendToYNABButton;