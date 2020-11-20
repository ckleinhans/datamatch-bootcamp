import React from 'react';
import { Link } from 'react-router-dom';
import './CardEditor.css';

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <h1>Flash Cards Application</h1><br/>
        <h4>by Caelan Kleinhans</h4>
        <hr/>
        <p>Welcome to the flash cards application! Use one of the following links to navigate to either the card editor or the card viewer.</p><br/>
        <Link to="/editor">Card Editor</Link><br/>
        <Link to="/viewer">Card Viewer</Link>
      </div>
    );
  }
}

export default Homepage;