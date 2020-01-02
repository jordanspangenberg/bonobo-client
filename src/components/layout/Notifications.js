import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

// Material UI
import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Typography,
  Badge,
} from "@material-ui/core";
import { Notifications as NotificationIcon, Favorite, Chat } from "@material-ui/icons";

// Redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

export class Notifications extends Component {
  static propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.object.isRequired,
  };
  state = {
    anchorEl: null,
  };
  handleOpen = (event) => {
    this.setState({
      anchorEl: event.target
    })
  }
  handleClose = () => {
    this.setState({anchorEl: null})
  }
  onMenuOpen = () => {
    let unreadNotificationIds = this.props.notifications
      .filter(note => 
        !note.read
      )
      .map(note => note.notificationId)
    this.props.markNotificationsRead(unreadNotificationIds)
  }
  render() {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    let notificationIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter(note => note.read === false).length > 0
        ? (notificationIcon = (
            <Badge
              badgeContent={notifications.filter(note => note.read === false).length}
              color="secondary"
            >
              <NotificationIcon />
            </Badge>
          ))
        : (notificationIcon = <NotificationIcon />);
    } else {
      notificationIcon = <NotificationIcon />;
    }
    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map(note => {
          const type = note.type === "like" ? "liked" : "commented on";
          const time = dayjs(note.createdAt).fromNow();
          const iconColor = note.read ? "primary" : "secondary";
          const icon =
            note.type === "like" ? (
              <Favorite color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <Chat color={iconColor} style={{ marginRight: 10 }} />
            );
          return (
            <MenuItem key={note.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="default"
                variant="body1"
                to={`/users/${note.recipient}/scream/${note.screamId}`}
              >
                {note.sender} {type} your scream {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>No notifications</MenuItem>
      );
    return (
      <Fragment>
        <Tooltip placeholder="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onclick={this.handleOpen}
          >
            {notificationIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpen}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.user.notifications,
});

const mapDispatchToProps = {
  markNotificationsRead,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
