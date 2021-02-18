import { MockedProvider } from '@apollo/client/testing';
import { makeDecorator } from '@storybook/addons';

export const withApollo = makeDecorator({
  name: 'ApolloProvider',
  parameterName: 'apolloProvider',
  wrapper(getStory, context, { parameters }) {
    return (
      <MockedProvider
        addTypename={false}
        defaultOptions={{
          watchQuery: {
            fetchPolicy: 'network-only'
          }
        }}
        {...parameters}
      >
        {getStory(context)}
      </MockedProvider>
    )
  }
});
