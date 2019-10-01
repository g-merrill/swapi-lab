import React, { Component } from 'react';
import './App.css';
import { getAllStarships } from '../services/sw-api';
import { Route, Link } from 'react-router-dom';

class App extends Component {

  state = {
    starships: []
  }

  async componentDidMount() {
    let starships = [];
    let freshStarships = { next: 'not null'};
    let i = 0;
    while (freshStarships.next) {
      freshStarships = await getAllStarships(i);
      starships = [...starships, ...freshStarships.results];
      i++;
    }
    this.setState({ starships });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">STAR WARS STARSHIPS</header>
        <Route exact path='/' render={() => (
          <div className="starships-ctnr">
            {this.state.starships.map((s, idx) => (
              <Link to={`/${idx}`} key={s.name} className="starship">{s.name}</Link>
            ))}
          </div>
        )}/>
        <Route path='/:id' render={props => (
          <div className="starship-detail">
            <div className="detail-row">
              <p>NAME:</p>
              <p>{this.state.starships[props.match.params.id].name}</p>
            </div>
            <div className="detail-row">
              <p>MODEL:</p>
              <p>{this.state.starships[props.match.params.id].model}</p>
            </div>
            <Link to='/' className="return-link">RETURN</Link>
          </div>
        )}/>
      </div>
    );
  }
}

export default App;
