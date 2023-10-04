import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api.crystallize.com/crystallize-assignment/catalogue",
  cache: new InMemoryCache(),
});
