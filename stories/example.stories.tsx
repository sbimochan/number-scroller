import React from 'react';
import { Meta, Story } from '@storybook/react';
import { NumberScroller, NumberScrollerProps } from '../src';

const meta: Meta = {
  title: 'Example',
  component: NumberScroller,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<NumberScrollerProps> = args => (
  <NumberScroller {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const BasicCountUp = Template.bind({});
BasicCountUp.args = { to: 100 };

export const BasicCountDown = Template.bind({});
BasicCountDown.args = { from: 100, to: 0 };

export const DelayedReaction = Template.bind({});
DelayedReaction.args = { to: 100, delay: 2000 };

export const CountSlow = Template.bind({});
CountSlow.args = { to: 100, timeout: 10000 };

export const CustomIncrement = Template.bind({});
CustomIncrement.args = { to: 10, step: 0.88 };

export const CustomIncrementDecimalPlaces = Template.bind({});
CustomIncrementDecimalPlaces.args = { to: 10, step: 0.27, decimalPlaces: 1 };

export const HandleNaN = Template.bind({});
HandleNaN.args = { to: NaN };

export const HandleStrings = Template.bind({});
HandleStrings.args = { to: 'strings' };

export const ToLocaleString = Template.bind({});
ToLocaleString.args = {
  to: 100,
  toLocaleStringProps: ['en-US', { style: 'currency', currency: 'USD' }],
};
