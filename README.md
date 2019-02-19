# react-animate-number

A very simple light weight react-component that animates your numbers.

## Installation

``` yarn add number-scroller```

## Usage

```javascript
import React from 'react';
import NumberScroller from 'number-scroller';

const ScoreGrid = props => {
  return (
    <div className="col-xs-4">
      <p>
        {props.to > 0 ? <NumberScroller to={props.to}/> : '-'}
      </p>
    </div>
  );
};

export default ScoreGrid;
```
