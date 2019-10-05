import {budgets} from "../store/selectors/ynab";
import {connect} from "react-redux";
import AccountRow from "../AccountRow";
import {addMapping} from "../store/actions/map";

function mapStateToProps(state) {
    return {
        budgets: budgets(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addMapping: mapping => dispatch(addMapping(mapping))
    }
}

const YNABAccountRow = connect(mapStateToProps, mapDispatchToProps)(AccountRow);
export default YNABAccountRow;