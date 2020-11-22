import React from 'react';
import { withRouter } from 'react-router-dom';
import './CardEditor.css';

const User = (props) => {
  return <div>{props.match.params.name}</div>
}

export default withRouter(User);