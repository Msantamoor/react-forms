import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';

class App extends Component {
  
  state= {
    fields: {}
  };

  onSubmit = fields => {
    this.setState({ fields });
  };

  render(){
    return (
      <div className="App">
        <Form onSubmit={fields => this.onSubmit(fields)} />
        <pre>
        {JSON.stringify(this.state.fields, ["fname", "lname", "email", "phone", "age", "password"], 2)}
        </pre>
      </div>
      
    );
    
  }
}
export default App;
