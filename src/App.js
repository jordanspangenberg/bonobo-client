import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider as ThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Components
import Navbar from './components/Navbar';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1a237e',
      light: '#534bae',
      dark: '#000051',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ff1744',
      light: '#ff616f',
      dark: '#000051',
      contrastText: '#000000'
    }
  },
  typography: {
    useNextVariants: true
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={home} />
              <Route exact path='/login' component={login} />
              <Route exact path='/signup' component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
