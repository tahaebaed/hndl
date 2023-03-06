import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';
const httpLink = createHttpLink({
  uri: 'https://fleet-management.tk//graphql',
});
const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const ApolloProvider = ({ children }) => <Provider client={client}>{children}</Provider>;

export default ApolloProvider;
