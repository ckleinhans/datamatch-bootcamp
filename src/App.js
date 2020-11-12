import React from 'react';
import CardEditor from './CardEditor.js';
import CardViewer from './CardViewer.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {front: 'front1', back: 'back1'},
        {front: 'front2', back: 'back2'},
      ],
      editorView: true,
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

  switchView = () => this.setState({editorView: !this.state.editorView});

  render () {
    if (this.state.editorView) {
      return(<CardEditor 
        deleteCard={this.deleteCard} 
        addCard={this.addCard} 
        cards={this.state.cards}
        switchView={this.switchView}
        />);
    } else {
      return(<CardViewer
        cards={this.state.cards}
        switchView={this.switchView}
      />)
    }
  }
}

export default App;
