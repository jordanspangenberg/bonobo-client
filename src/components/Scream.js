/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'


// MUI imports
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
    objectFit: 'cover'
  },
  content: {
    padding: 20,
  }
};

export class Scream extends Component {
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
      }
    } = this.props
    return (
    <Card className={classes.card}>
      <CardMedia image={userImage} title='Profile Image' className={classes.image}/>
      <CardContent className={classes.content}>
        <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
        {/* TODO Add hover tooltip for verbose datetime*/}
        <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
        <Typography variant="body1" >{body}</Typography>

      </CardContent>
    </Card>
    )
  }
}

export default withStyles(styles)(Scream);
