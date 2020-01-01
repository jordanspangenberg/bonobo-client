import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteScream from '../components/DeleteScream';

// MUI imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button
} from '@material-ui/core';

// Redux
import { connect } from 'react-redux';
import { postScream } from '../redux/actions/dataActions';
import { Add, Close } from '@material-ui/icons';

const styles = theme => ({
  ...theme.styles,
  submitButton: {
    position: 'relative',
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
});

class PostScream extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  };
  componentWillReceiveProps (nextProps){
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      })
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: '',
      })
      this.handleClose()
    }
  }
  handleOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
      errors: {}
    });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value})
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.postScream({body: this.state.body})
  }
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <MyButton tip='Post a scream' onClick={this.handleOpen}>
          <Add />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton
            tip='Close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <Close />
          </MyButton>
          <DialogTitle>Post a New Scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='body'
                type='text'
                label='Scream!!'
                multiline
                rows='3'
                placeholder='Scream at your fellow apes'
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && 
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
                }
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps, { postScream })(
  withStyles(styles)(PostScream)
);
