import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routing/Auth";
import Dashboard from "../routing/Dashboard";

function RootNavigation() {
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path='/login'
                    render={props => <Auth {...props} authRoute='login' />}
                />
                <Route
                    exact
                    path='/register'
                    render={props => <Auth {...props} authRoute='register' />}
                />
                <Route path='/' exact component={Dashboard} />
            </Switch>
        </Router>
    )
}

export default RootNavigation
