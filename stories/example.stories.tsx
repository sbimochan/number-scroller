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

Default.args = { to: 100 };
