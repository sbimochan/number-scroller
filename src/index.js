import React from "react";

class NumberScroller extends React.Component {
  constructor(props) {
    super(props);
    const RADIX = 10;
    this.state = {
      finalNumber: parseInt(props.to, RADIX) || 0,
      initialNumber: parseInt(props.from, RADIX) || 0,
      delay: parseInt(props.delay, RADIX) || 25
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
  }

  componentDidMount() {
    this.runEngine();
  }

  render() {
    return this.state.initialNumber;
  }
}

export default NumberScroller;
