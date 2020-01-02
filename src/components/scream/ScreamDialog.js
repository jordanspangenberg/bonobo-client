import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Comments from './Comments'

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
import { Close, UnfoldMore, Favorite, FavoriteBorder, Chat } from "@material-ui/icons";

// Redux
import { connect } from "react-redux";
import { getScream, likeScream, unlikeScream } from "../../redux/actions/dataActions";

const styles = theme => ({
  ...theme.styles,
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
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.screamId === this.props.scream.screamId
      )
    ) {
      return true;
    } else {
      return false;
    }
  };
  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId)
  }
  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId)
  }
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
        comments
      },
      UI: { loading },
      user: {
        authenticated,
        credentials: {handle}
      }
    } = this.props;
    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color='primary' />
        </Link>
      </MyButton>
    ) : (
      this.likedScream() ? (
        <MyButton tip="Remove like" onClick={this.unlikeScream}>
          <Favorite color="primary" />
        </MyButton>
      ) : (
        <MyButton tip="Like" onClick={this.likeScream}>
          <FavoriteBorder color="primary" />
        </MyButton>
      )
    )
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
          {likeButton} <span>{likeCount}</span>
          <MyButton tip='comments'>
            <Chat color='primary' />
          </MyButton>
          <span>{commentCount}</span>
        </Grid>
          <hr className={classes.visibleBreak} />
        <Comments comments={comments} />
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
  user: state.user
});

const mapActionsToProps = {
  getScream,
  likeScream,
  unlikeScream
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
