import { withNextRouter } from 'storybook-addon-next-router';
import { Story, Meta } from '@storybook/react/types-6-0';

import TestComponent, { IProps } from './test-component';
import { mocks, variables } from './mock-data';
import { withApollo } from '../../storybook/decorators';

export default {
  title: 'Components/TestComponent',
  component: TestComponent,
  decorators: [withNextRouter, withApollo],
} as Meta;

const Template: Story<IProps> = (args) => <TestComponent {...args} />

export const View = Template.bind({});

View.args = {
  label: 'test-label',
};

View.parameters = {
  nextRouter: {
    query: variables,
  },
  apolloProvider: {
    mocks,
  },
}