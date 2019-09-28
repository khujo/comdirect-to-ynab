import {accessToken} from "../store/selectors/ynab";
import {connect} from "react-redux";
import App from "../App";

let mapStateToProps = state => ({accessToken: accessToken(state)});

const YNABApp = connect(mapStateToProps)(App);

export default YNABApp;