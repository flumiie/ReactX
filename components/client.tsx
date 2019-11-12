import
{
  ApolloClient,
  InMemoryCache,
  HttpLink
} from 'apollo-client-preset';

export const client = new ApolloClient(
{
  //Assign to your cache property a instance of a InMemoryCache
  cache: new InMemoryCache(),
  //Assign your link with a new instance of a HttpLink linking to your graphql server.
  link: new HttpLink(
  {
    uri: 'https://api.spacex.land/graphql/',
  })
})