
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  split
} from '@apollo/client';
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from "apollo-link-ws";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RetryLink } from "apollo-link-retry";
import { getMainDefinition } from "apollo-utilities";

import './css/login.css'
import MainRouter from './MainRouter';

const App = () => {

  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => alert(`Graphql error ${message}`));
    }
  });

  const retry = new RetryLink({ attempts: { max: Infinity } });

  const httpLink = new HttpLink({
    // uri: `http://localhost:4000/graphql`,
    uri: `http://192.168.1.107:4000/graphql`,
    credentials: "same-origin"
  });

  const wsLink = new WebSocketLink({
    uri: `ws://192.168.1.107:4000/graphql`,
    // uri: `ws://localhost:4000/graphql`,
    options: {
      reconnect: true,
    },
  });

  const terminatingLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    httpLink,
    retry
  );

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers = { ...headers, "authorization": token };
      }
      return { headers };
    });
    return forward(operation);
  });

  const link = ApolloLink.from([authLink, errorLink, terminatingLink]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
  })

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ToastContainer />
        <MainRouter />
      </BrowserRouter>
    </ApolloProvider>
  );
}
export default App;
