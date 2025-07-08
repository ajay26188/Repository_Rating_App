import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';

import { setContext } from '@apollo/client/link/context';

const apolloUri = Constants.expoConfig.extra.env;

const httpLink = createHttpLink({
  uri: apolloUri,
});


const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
          'Content-Type': 'application/json',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers: {
          ...headers,
          'Content-Type': 'application/json', 
        },
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;