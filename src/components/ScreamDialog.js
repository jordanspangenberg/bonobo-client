import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// MaterialUi
import withStyles from "@material-ui/core/styles/withStyles";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { Close, UnfoldMore } from "@material-ui/icons";

// Redux
import { connect } from "react-redux";
import { getScream } from "../redux/actions/dataActions";

const styles = theme => ({
  ...theme.styles,
  invisibleBreak: {
    border: "none",
    margin: 4,
  },
  profileImage: {
    maxWidth: 200,
    width: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '5%'
  },
  expandButton: {
    position: 'absolute',
    left: '92%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }

});

class ScreamDialog extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({
      open: true,
    });
    this.props.getScream(this.props.screamId);
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
      },
      UI: { loading },
    } = this.props;
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2}/>
      </div>
    ) : (
      <Grid container spacing={4}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleBreak} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleBreak} />
          <Typography variant="body1">{body}</Typography>
        </Grid>
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          tip="Expand scream"
          onClick={this.handleOpen}
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <Close />
          </MyButton>
          <DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI,
});

const mapActionsToProps = {
  getScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
