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
    //this.LoginWithFacebook = this.LoginWithFacebook.bind(this);
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
          <button onClick={() => this.handleLogOut()}>Cerrar Sesión</button>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Inicia Sesión</h2>
          <button onClick={this.LoginWithGoogle} className="button g">Google</button><br></br>
          <button onClick={() => this.LoginWithFacebook()} className="button f">Facebook</button><br></br>
          <button onClick={() => this.LoginWithGitHub()} className="button t">GitHub</button><br></br>
        </div>
      )
    }
  }

  LoginWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider);

  }

  LoginWithGitHub(){
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  LoginWithFacebook(){
	var provider = new firebase.auth.FacebookAuthProvider();
	provider.addScope('email');
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Facebook Access Token. You can use it to access the Facebook API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		// ...
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
	});
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
