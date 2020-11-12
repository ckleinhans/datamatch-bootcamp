import React from 'react';
import './CardEditor.css';

class CardEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: '',
      back: '',
    }
  }

  addCard = () => {
    if (this.state.front.trim().length > 0 && this.state.back.trim().length > 0) {
      this.props.addCard(this.state);
      this.setState({front: '', back: ''});
    }
  }

  deleteCard = index => {
    this.props.deleteCard(index);
  }

  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    const cards = this.props.cards.map((card, index) => {
      return (
        <tr key={index}>
          <td>{card.front}</td>
          <td>{card.back}</td>
          <td><button onClick={() => this.deleteCard(index)}>Delete Card</button></td>
        </tr>
      )
    });

    const changeViewButton = (cards.length > 0) ? 
        <button onClick={this.props.switchView}>View Cards</button> : 'You must have at least 1 card to use the Card Viewer.';

    return (
      <div>
        <h2>Card Editor</h2>
        <table>
          <thead>
            <tr>
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
        {changeViewButton}
      </div>
    )
  }
}

export default CardEditor;