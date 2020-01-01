/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import  MyButton  from '../util/MyButton'

// MUI imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';
import { Chat, Favorite, FavoriteBorder } from '@material-ui/icons';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200,
    objectFit: 'cover'
  },
  content: {
    padding: 20
  }
};

export class Scream extends Component {
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
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount
      },
      user: {
        authenticated
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
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title='Profile Image'
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant='h5'
            color='primary'
            component={Link}
            to={`/users/${userHandle}`}
          >
            {userHandle}
          </Typography>
          {/* TODO Add hover tooltip for verbose datetime*/}
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant='body1'>{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip='comments'>
            <Chat color='primary' />
          </MyButton>
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeScream,
  unlikeScream
};
export default connect(
  mapStatetoProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
