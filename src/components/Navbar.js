import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppIcon from '../images/monkey.svg';

// MaterialUI Imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = {
  logo: {
    height: "60px",
  }
};
export class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar>
        <Toolbar className='nav-container'>
          {/*<img className={classes.logo} src={AppIcon} alt='Bonobo App Icon' />*/}
          <Button color='inherit' component={Link} to='/login'>
            Login
          </Button>
          <Button color='inherit' component={Link} to='/'>
            Home
          </Button>
          <Button color='inherit' component={Link} to='/signup'>
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}


export default withStyles(styles)(Navbar);