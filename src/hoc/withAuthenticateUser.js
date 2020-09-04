import React from "react"
import userService from "../services/userService";

const withAuthenticateUser = (WrappedComponent, data) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                redirectTo: data.redirectTo || '/'
            }
        }

        isAuthenticated() {
            return localStorage.getItem('user') ? true : false;
        }

        componentWillMount() {
            if (!this.isAuthenticated()) {
                this.props.history.push(this.state.redirectTo);
                userService.logout();
            }
        }

        componentWillUpdate(nextProps) {
            if (!this.isAuthenticated()) {
                nextProps.history.push(this.state.redirectTo);
                userService.logout();
            }
        }

        render() {
            return <WrappedComponent {...this.props}/>;
        }
    }
}

export default withAuthenticateUser;
