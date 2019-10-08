import {addAccounts} from "../store/actions/csv";
import {connect} from "react-redux";
import DropZone from "../DropZone";

function mapDispatchToProps(dispatch) {
    return {
        addAccounts: accounts => dispatch(addAccounts(accounts))
    }
}

const CSVDropZone = connect(null, mapDispatchToProps)(DropZone);

export default CSVDropZone;