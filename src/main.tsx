import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import App from "./App";
import "./index.css";

import { Toaster } from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL; 
console.log("API URL:", apiUrl);

const client = new ApolloClient({
  link: new HttpLink({ uri: import.meta.env.VITE_API_URL }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            merge: false,  
          },
        },
      },
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
     
      <BrowserRouter>
        <App />
        <Toaster position="top-right" />
      </BrowserRouter>
      
    </ApolloProvider>
  </React.StrictMode>
);
