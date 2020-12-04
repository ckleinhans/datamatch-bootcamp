import React from 'react';
import './CardEditor.css';
import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Homepage extends React.Component {
  render() {

    let decks;
    if (!isLoaded(this.props.decks)) {
      decks = <div>Loading...</div>
    } else if (isEmpty(this.props.decks)) {
      decks = <div>No decks found</div>
    } else {
      const keys = Object.keys(this.props.decks);
      decks = keys.map(key => {
        const name = this.props.decks[key].name;
        return(<div><Link to={`/viewer/${key}`}>{name}</Link></div>)
      })
    }

    return (
      <div>
        <h1>Flash Cards Application</h1><br/>
        <h4>by Caelan Kleinhans</h4>
        <hr/>
        <p>Welcome to the flash cards application! Use one of the following links to navigate to either create a new deck or view existing ones.</p><br/>
        <Link to="/editor">Create New Deck</Link><br/>
        <br/>
        <h3>Decks</h3>
        {decks}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return({decks: state.firebase.data['names']});
}

export default compose(
  withRouter,
  firebaseConnect(props => {
    return [{path: '/names', storeAs: 'names'}];
  }),
  connect(mapStateToProps)
)(Homepage);