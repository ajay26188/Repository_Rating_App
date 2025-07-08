import SignInContainer from './SignInContainer';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.error("Login failed:", e);
      console.error("GraphQL errors:", e.graphQLErrors);
      console.error("Network error:", e.networkError);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
