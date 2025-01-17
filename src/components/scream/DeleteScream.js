import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';

import withStyles from '@material-ui/core/styles/withStyles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions
} from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';

// Redux
import { connect } from 'react-redux';
import { deleteScream } from '../../redux/actions/dataActions';

const styles = {
  deleteButton: {
    left: '92%',
    top: '8%',
    position: 'absolute'
  }
};

class DeleteScream extends Component {
  static propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
  };
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteScream = () => {
    this.props.deleteScream(this.props.screamId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip='Delete Scream'
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color='secondary' />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>Are you sure you want to delete this scream?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.deleteScream} color='secondary'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream));
