# number-scroller

A very simple light weight react-component that animates your numbers.

## Installation

` yarn add react-number-scroller`

## Usage

### Simply supply a 'to' prop and it will scroll to that number (By default, it takes 1 second to reach the new value)

```javascript
import React, { useState } from "react";
import NumberScroller from "number-scroller";

const MyNumberComponent = () => {
  const [number, setNumber] = useState(100);
  return (
    <p>
      <NumberScroller to={number} timeout={1000} />
    </p>
  );
};
```

### Optionally, you can set the delay interval manually (milliseconds between each render)

```javascript
import Reactfrom "react";
import NumberScroller from "number-scroller";

const MyCustomDelayComponent = () => {
  return (
    <p>
      <NumberScroller to={100} delay={25} />
    </p>
  );
};
```

### Optionally, Customize the starting value with the 'from' prop (defaults from 0)

```javascript
import React from "react";
import NumberScroller from "number-scroller";

const MyCustomDelayComponent = () => {
  return (
    <p>
      <NumberScroller from={100} to={20} />
    </p>
  );
};
```

### Format the number to a locale string such as currency

```javascript
import React from "react";
import NumberScroller from "number-scroller";

const MyCurrencyComponent = () => {
  return (
    <p>
      <NumberScroller
        to={100}
        localeStringProps={[
          "en-US",
          {
            style: "currency",
            currency: "USD",
          },
        ]}
      />
    </p>
  );
};
```
