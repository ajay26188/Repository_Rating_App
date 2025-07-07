import CreateReviewContainer from './CreateReviewContainer';
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/mutations';
import {useMutation} from '@apollo/client'
import SignUpContainer from './SignUpContainer';

const SignUp = () => {
  const [createUser, result] = useMutation(CREATE_REVIEW)
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, review } = values;

    try {
      const { data } = await createReview({variables: {ownerName, repositoryName, rating: Number(rating), text: review}});
      console.log(data);
      navigate(`/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
