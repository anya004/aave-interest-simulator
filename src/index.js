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
  //uri: 'https://api.thegraph.com/subgraphs/name/aave/protocol'
  uri: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2'
});

// 3
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          reserves: {
            keyArgs: ["where", ["symbol"], "orderBy"],
          }
        }
      },
      Reserve: {
        fields: {
          paramsHistory: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: ["first", "orderDirection", "orderBy", "where", ["timestamp_lte"]],
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing, incoming, { args }) {
              // console.log("Merging args: ",args);
              // console.log("Incoming length:", incoming.length);
              if (!incoming.length)
                return existing;
              return existing ? [...existing, ...incoming] : incoming;
            },
          }
        }
      }
    }
  })
});

// 4
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);