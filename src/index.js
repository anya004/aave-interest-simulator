import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';

// 1
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

// 2
const httpLink = createHttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/aave/protocol'
});

// 3
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

// 4
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);