import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppIcon from '../images/monkey.svg';

// MUI Stuff
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress
} from '@material-ui/core';

// Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = theme => ({
  ...theme.styles
});
export class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }
  componentWillReceiveProps(next) {
    if (next.UI.errors) {
      this.setState({
        errors: next.UI.errors
      });
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt='Bonobo App Icon' className={classes.image} />
          <Typography variant='h2' className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id='email'
              name='email'
              type='email'
              label='Email'
              helperText={errors.email}
              error={errors.email ? true : false}
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id='password'
              name='password'
              type='password'
              label='Password'
              helperText={errors.password}
              error={errors.password ? true : false}
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant='body2' className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Dont have an account? Sign up <Link to='/signup'>here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
