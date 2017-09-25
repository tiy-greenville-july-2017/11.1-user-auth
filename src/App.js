import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var Cookies = require('js-cookie');

var HEADERS = {
  'X-Parse-Application-Id': 'tiygvl',
  'X-Parse-REST-API-Key': 'slumber',
  'X-Parse-Revocable-Session': 1
};

const PARSE_URL = 'https://tiny-parse-server.herokuapp.com';

function Header(props){
    return (
      <h1>Welcome {props.user.username}!</h1>
    );
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      'username': '',
      'password': '',
      'signupUsername': '',
      'signupPassword': ''
    };

    var loggedInUser = localStorage.getItem('user');

    if(loggedInUser){
      this.state.user = JSON.parse(loggedInUser);
    }

  }

  handleUsername = (e) => {
    this.setState({'username': e.target.value});
  }

  handlePassword = (e) => {
    this.setState({'password': e.target.value});
  }

  handleSignupUsername = (e) => {
    this.setState({'signupUsername': e.target.value});
  }

  handleSignupPassword = (e) => {
    this.setState({'signupPassword': e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var un = this.state.username;
    var pw = this.state.password;
    var qs = 'username=' + encodeURIComponent(un) + '&password=' + pw;

    fetch(PARSE_URL + '/login?' + qs, {
      headers: HEADERS
    }).then(function(resp){
      return resp.json();
    }).then((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      HEADERS['X-Parse-Session-Token'] = user.sessionToken;

      this.setState({user: user});
    });
  }

  handleSignupSubmit = (e) => {
    e.preventDefault();

    var un = this.state.signupUsername;
    var pw = this.state.signupPassword;

    fetch(PARSE_URL + '/users', {
      headers: HEADERS,
      body: JSON.stringify({'username': un, 'password': pw}),
      method: 'POST'
    }).then(function(resp){
      return resp.json();
    }).then((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      HEADERS['X-Parse-Session-Token'] = user.sessionToken;

      this.setState({user: user});
    });
  }

  getNoLook = (e) => {
    fetch(PARSE_URL + '/classes/NoLooking', {
      headers: HEADERS
    }).then(function(resp){
      return resp.json();
    }).then((resp) => {
      console.log(resp);
    });
  }

  render() {
    return (
      <div className="App container">
        <div className="row">

          {this.state.user ? <Header user={this.state.user} /> : null}

          <div className="col-md-6">
            <h1>Login</h1>

            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input onChange={this.handleUsername} type="email" className="form-control" id="username" placeholder="Username" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input onChange={this.handlePassword} type="password" className="form-control" id="password" placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>

          <div className="col-md-6">
            <h1>Sign Up!</h1>

            <form onSubmit={this.handleSignupSubmit}>
              <div className="form-group">
                <label htmlFor="signup-username">Username</label>
                <input onChange={this.handleSignupUsername} type="email" className="form-control" id="signup-username" placeholder="Username" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input onChange={this.handleSignupPassword} type="password" className="form-control" id="signup-password" placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>

          <button onClick={this.getNoLook}>See NoLooking Stuff</button>

        </div>
      </div>
    );
  }
}

/**
 * Cookies
 */
// console.log(document.cookie);

// document.cookie = 'fav=oreo';
//
// document.cookie = 'second=chocolate chip';

// var cookies = document.cookie.split('; ');
// for(var i=0; i<= cookies.length; i++){
//   if(!cookies[i]){
//     break;
//   }
//
//   var cookieParts = cookies[i].split('=');
//   var key = cookieParts[0];
//   var value = cookieParts[1];
//
//   if(key == 'fav'){
//     console.log('Your favorite cookie is:', value);
//   }
// }

// console.log('Your favorite cookie is:', Cookies.set('fav', 'chocolate'));

/**
 * localStorage
 */

// var storage = window.localStorage;
//
// storage.setItem('fav', 'oreo');
//
// console.log(storage.getItem('fav'));
//
// var truck = {
//   'doors': 2,
//   'color': 'white',
//   'bumper': false
// };
//
// localStorage.setItem('truck', JSON.stringify(truck));
// var storedTruck = JSON.parse(localStorage.getItem('truck'));
//
// console.log(storedTruck.color);

export default App;
