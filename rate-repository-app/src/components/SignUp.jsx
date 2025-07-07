import CreateReviewContainer from './CreateReviewContainer';
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/mutations';
import {useMutation} from '@apollo/client'
import SignUpContainer from './SignUpContainer';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';

const SignUp = () => {
    const [signIn] = useSignIn();
    const [createUser, result] = useMutation(CREATE_USER)
    const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data: signUp } = await createUser({variables: { username, password}});

      const { data: login } = await signIn({ username, password });

      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
