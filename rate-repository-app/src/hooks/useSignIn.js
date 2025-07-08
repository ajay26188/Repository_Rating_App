import {useMutation} from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();
    const [ mutate, result ] = useMutation(LOGIN);
  
    const signIn = async ({ username, password }) => {
      const {data}= await mutate({variables: {username, password}});
      const token = data.authenticate.accessToken;
      await authStorage.setAccessToken(token);
      await apolloClient.resetStore();
      return {data};
    };
  
    return [signIn, result];
  };

  export default useSignIn;