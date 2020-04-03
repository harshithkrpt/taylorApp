import React from "react";
import ReactDOM from "react-dom";

import { Provider, Client, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { BLOUSE_QUERY } from "./components/Blouse/Blouse";

import "./index.css";
import App from "./App";

const cache = cacheExchange({
  updates: {
    Mutation: {
      addBlouse: (result, args, cache, info) => {
        cache.updateQuery({ query: BLOUSE_QUERY }, data => {
          data.blouses.push(result.addBlouse);
          return data;
        });
      }
    }
  }
});

const client = new Client({
  url: "http://localhost:8080",
  exchanges: [dedupExchange, cache, fetchExchange]
});

ReactDOM.render(
  <Provider value={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
