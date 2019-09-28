import {connect} from "react-redux";
import {accessToken, loginPending} from "../store/selectors/ynab";
import {LoginButton} from "../LoginButton";

let clientId = "dae768ce4e0279d3d9f7721f0828630c72a16189ffc68ce9b1087ababb37a6f0";

let authEndpoint = `https://app.youneedabudget.com/oauth/authorize?client_id=${clientId}&redirect_uri=${window.location.href}&response_type=token`;

let mapStateToProps = state => ({
    accessToken: accessToken(state),
    loginPending: loginPending(state),
    onClick: () => window.location.href = authEndpoint
});

const YNABLoginButton = connect(mapStateToProps)(LoginButton);

export default YNABLoginButton;