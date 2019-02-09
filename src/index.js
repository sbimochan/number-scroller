import React from 'react';

class NumberScroller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finalNumber: parseInt(props.to) || null,
      initialNumber: parseInt(props.from) || null,
      delay: parseInt(props.delay) || 25,
    };
  }

  runEngine() {
    if (this.state.initialNumber < this.state.finalNumber) {
      setTimeout(() => {
        this.setState({
          initialNumber: this.state.initialNumber + 1
        });
        this.runEngine();
      }, this.state.delay);
    }
  };

  componentDidMount() {
    this.runEngine();
  }

  render() {
    return this.state.initialNumber;
  }
}

export default NumberScroller;
