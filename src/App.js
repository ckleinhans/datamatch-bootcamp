import React from 'react';
import CardEditor from './CardEditor.js';
import CardViewer from './CardViewer.js';
import Homepage from './Homepage.js';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import User from './User.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {front: 'front1', back: 'back1'},
        {front: 'front2', back: 'back2'},
      ],
    };
  }

  addCard = card => {
    const cardToAdd = {
      front: card.front.trim(),
      back: card.back.trim(),
    };
    const cards = this.state.cards.slice().concat(cardToAdd);
    this.setState({cards});
  }

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({cards});
  }

  render () {
    return(
    <Switch>
      <Route exact path="/editor">
        <CardEditor 
          deleteCard={this.deleteCard} 
          addCard={this.addCard} 
          cards={this.state.cards}
        />
      </Route>
      <Route exact path="/viewer">
        <CardViewer
          cards={this.state.cards}
        />
      </Route>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route path="/user/:name">
        <User />
      </Route>
    </Switch>
    );
  }
}

export default App;
