import React from "react";
import userService from "../services/userService";
import {withRouter} from "react-router-dom";

const LogoutPage = ({history}) => {

    userService.logout();
    history.push("/")

    return (
        <div>Déconnection</div>
    );
}

export default withRouter(LogoutPage);
