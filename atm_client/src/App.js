import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthContextProvider from './components/context/AuthContext';
import AtmContextProvider from './components/context/AtmContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register'
import Home from './components/Home';
import Dashboard from './routing/Dashboard';
import Auth from './routing/Auth'

const App = () => {
  return (
    <AuthContextProvider>
      <AtmContextProvider>
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
            <Route path='/' exact component={Dashboard}/>
          </Switch>
        </Router>
      </AtmContextProvider>
    </AuthContextProvider>
  );
}

export default App;
