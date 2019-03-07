import React, { Component } from 'react';
import PasswordStrengthMater from './passwordStrength'
import './styles.css'
class App extends Component {

  constructor() {
  	super()
  	this.state = {
  		password: ''
  	}
  	this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  onChangeHandler(event, attr) {
  	const newState = { ...this.state }
  	newState[attr] = event.target.value
  	this.setState(newState)
  }

  render() {
    return (
      <div className="App container">
      	<PasswordStrengthMater
      		value={this.state.password}
      		placeholder="Ener Your Password"
      		onChangeHandler={(event) => this.onChangeHandler(event, 'password')}
      	/>
        <div className="Note">
          <label>Note:</label>
          <ul>
            <li>Atleast 8 charecter</li>
            <li>With atleast one digit</li>
            <li>With atleast one special Charecter</li>
            <li>With atleast one small letter</li>
            <li>With atleast one capital letter</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;