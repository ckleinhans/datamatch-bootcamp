import React from 'react';
import './CardEditor.css';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {connect} from 'react-redux';

class CardEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      front: '',
      back: '',
      name: '',
      isPublic: false,
    }
  }

  addCard = () => {
    if (this.state.front.trim().length > 0 && this.state.back.trim().length > 0) {
      const cardToAdd = {
        front: this.state.front.trim(),
        back: this.state.back.trim(),
      };
      const cards = this.state.cards.slice().concat(cardToAdd);
      this.setState({cards, front: '', back: ''});
    }
  }

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({cards});
  }

  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleCheckboxChange = event => {
    this.setState({[event.target.name]: event.target.checked});
  }

  createDeck = () => {
    const deckId = this.props.firebase.push('/flashcards').key;
    const newDeck = {
      name: this.state.name,
      cards: this.state.cards,
      owner: this.props.isLoggedIn,
    };
    const updates = {};
    updates[`/flashcards/${deckId}`] = newDeck;
    updates[`/names/${deckId}`] = {
      name: newDeck.name,
      isPublic: this.state.isPublic,
      owner: newDeck.owner,
    };
    const onUpdate = () => {
      this.props.history.push(`/viewer/${deckId}`);
    };
    this.props.firebase.update('/', updates, onUpdate);
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to='/register'/>
    }

    const cards = this.state.cards.map((card, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{card.front}</td>
          <td>{card.back}</td>
          <td><button onClick={() => this.deleteCard(index)}>Delete Card</button></td>
        </tr>
      )
    });

    return (
      <div>
        <h2>Card Editor</h2>
        <div>
          Deck name: <input name="name" onChange={this.handleInputChange} placeholder="Name of deck" value={this.state.name}/>
          <div/>
          <input type="checkbox" id="public" name="isPublic" checked={this.state.isPublic} onChange={this.handleCheckboxChange}/>
          <label for="public"> Make this deck public</label><br/>
        </div><br/>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Front</th>
              <th>Back</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {cards}
          </tbody>
        </table>
        <br/>
        <input
          name="front"
          placeholder="Front of card" 
          value={this.state.front} 
          onChange={this.handleInputChange}/>
        <input
          name="back"
          placeholder="Back of card"
          value={this.state.back} 
          onChange={this.handleInputChange}/>
        <button onClick={this.addCard}>Add Card</button>
        <hr/>
        <div>
          <button onClick={this.createDeck} disabled={this.state.name.trim() === '' || this.state.cards.length === 0}>Create Deck</button>
        </div><br/>
        <Link to="/">Home</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {isLoggedIn: state.firebase.auth.uid};
}

export default compose(firebaseConnect(), connect(mapStateToProps), withRouter)(CardEditor);