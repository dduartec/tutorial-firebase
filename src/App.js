import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from 'firebase';

class App extends Component {

  constructor() {
    super();

    this.state = {
      user: null,
    }

    this.handleLogOut = this.handleLogOut.bind(this);
    this.renderizarBotones = this.renderizarBotones.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user
      })
    })
  }
  handleLogOut() {
    firebase.auth().signOut();
  }

  renderizarBotones() {
    if (this.state.user) {
      return (
        <div>
          <h2>Sesión Iniciada</h2>
          <h3>{this.state.user.displayName}</h3>
          <button onClick={this.handleLogOut()}></button>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Inicia Sesión</h2>
          <button className="button g">Google</button><br></br>
          <button className="button f">Facebook</button><br></br>
          <button className="button t">Twitter</button><br></br>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <h1>
          Tutorial Firebase
        </h1>
        <div>
          {
            this.renderizarBotones()
          }
        </div>
      </div>
    );
  }
}

export default App;
