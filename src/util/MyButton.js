import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton } from '@material-ui/core';

function MyButton({ children, onClick, tip, btnClassName, tipClassName }) {
  return (
    <Tooltip title={tip} className={tipClassName} placement="top">
      <IconButton onClick={onClick} className={btnClassName}>
        {children}
      </IconButton>
    </Tooltip>
  )
}

MyButton.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func,
  tip: PropTypes.string,
  btnClassName: PropTypes.string,
  tipClassName: PropTypes.string,
};

export default MyButton;
