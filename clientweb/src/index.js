import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";

const client = new ApolloClient({
  link: createUploadLink({
    uri: "http://localhost:8080",
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);
