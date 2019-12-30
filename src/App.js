import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themeLiteral from './util/theme'
import jwtDecode from 'jwt-decode'

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute'

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme(themeLiteral);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    authenticated = false;
    window.location.href = '/login'
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={home} />
              <AuthRoute exact path='/login' component={login} authenticated={authenticated} />
              <AuthRoute exact path='/signup' component={signup} authenticated={authenticated} />
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
