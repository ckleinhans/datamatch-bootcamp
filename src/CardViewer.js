import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './CardEditor.css';
import {firebaseConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      viewingFront: true,
    }
  }

  previousCard = () => {
    if (this.state.currentIndex !== 0) {
      this.setState({currentIndex: this.state.currentIndex - 1, viewingFront: true})
    }
  }

  nextCard = () => {
    if (this.state.currentIndex !== this.props.cards.length - 1) {
      this.setState({currentIndex: this.state.currentIndex + 1, viewingFront: true})
    }
  }

  handleFlipCard = () => {
    this.setState({viewingFront: !this.state.viewingFront});
  }
  
  render() {
    if (!isLoaded(this.props.cards)) {
      return(<div>Loading...</div>);
    }

    if (isEmpty(this.props.cards)) {
      return(<div>Page not found</div>);
    }

    const card = this.state.viewingFront ? this.props.cards[this.state.currentIndex].front : this.props.cards[this.state.currentIndex].back;

    return (
      <div>
        <h2>{this.props.name}</h2>
        <table>
          <tbody>
            <tr>
              <td id='cardWindow' colSpan='3' onClick={this.handleFlipCard}>
                {card}
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={this.previousCard}>Previous Card</button>
              </td>
              <td id='progressBar'>
                Card {this.state.currentIndex + 1}/{this.props.cards.length}
              </td>
              <td>
                <button onClick={this.nextCard}>Next Card</button>
              </td>
            </tr>
          </tbody>
        </table>
        <hr/>
        <Link to="/">Home</Link>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const deck = state.firebase.data[props.match.params.deckId];
  const name = deck && deck.name;
  const cards = deck && deck.cards;
  return {cards: cards, name: name};
}

export default compose(
  withRouter,
  firebaseConnect(props => {
    const deckId = props.match.params.deckId;
    return [{path: `/flashcards/${deckId}`, storeAs: deckId}];
  }),
  connect(mapStateToProps)
)(CardViewer);