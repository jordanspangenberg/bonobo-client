import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../util/MyButton';

// MUI imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions
} from '@material-ui/core';
import { DeleteOutline, Delete } from '@material-ui/icons';

// Redux
import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';

const styles =  {
  deleteButton: {
    left: "90%",
    top: "8%",
    position: "absolute"
  }
}

class DeleteScream extends Component {
  static propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
  };
  state = {
    open: false
  }
  handleOpen = () => {
    this.setState({open: true})
  }
  handleClose = () => {
    this.setState({open: false})
  }
  deleteScream = () => {
    this.props.deleteSCream(this.props.screamId)
    this.setState({open: false})
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip='Delete Scream'
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogTitle>
            Are you sure you want to delete this scream?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" >Cancel</Button>
            <Button onClick={this.deleteScream} color="secondary" >Delete</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream));
