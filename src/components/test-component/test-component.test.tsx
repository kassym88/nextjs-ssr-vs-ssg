import { render, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import TestComponent from './test-component';
import { mocks, variables as mockVariables } from './mock-data';

jest.mock('next/router', () => ({
  useRouter: () => ({
      route: '/',
      pathname: '',
      query: mockVariables,
      asPath: '',
    }),
}));

describe('TestComponent', () => {
  it('should render correctly', async () => {
    const wrapper = render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        // MockedProvider not working as described in documentation: data from useQuery hook always undefined
        // https://github.com/apollographql/react-apollo/issues/1747#issuecomment-531752539
        defaultOptions={{
          watchQuery: {
            fetchPolicy: 'network-only',
          }}}
      >
        <TestComponent label="Test" />
      </MockedProvider>
    );

    await act(async () => {
      await new Promise(setImmediate);
    });

    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
