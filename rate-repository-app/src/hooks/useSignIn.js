import {useMutation} from '@apollo/client';
import { LOGIN } from '../graphql/mutations';

const useSignIn = () => {
    const [ mutate, result ] = useMutation(LOGIN, {
        onError: (error) => {
          setError(error.graphQLErrors[0].message)
        }
      })
  
    const signIn = async ({ username, password }) => {
      return await mutate({variables: {username, password}});
    };
  
    return [signIn, result];
  };

  export default useSignIn;