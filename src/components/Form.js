import { Component } from 'react';

class Form extends Component {
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
}

export default Form;