import React from 'react';
import { Link } from 'react-router-dom';

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
    const card = this.state.viewingFront ? this.props.cards[this.state.currentIndex].front : this.props.cards[this.state.currentIndex].back;

    return (
      <div>
        <h2>Card Viewer</h2>
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
        <Link to="/editor">Go to the card editor</Link>
      </div>
    )
  }
}

export default CardViewer;