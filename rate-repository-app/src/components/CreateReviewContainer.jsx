import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import Text from './Text'; // assuming your custom Text
import { useFormik } from 'formik';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: { padding: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginVertical: 6,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#0366d6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
  .number()
  .required('Rating is required')
  .min(0, 'Minimum is 0')
  .max(100, 'Maximum is 100'),

});

const CreateReviewContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { ownerName: '', repositoryName: '', rating: '', review: '' },
    validationSchema,
    onSubmit,
  });

  const ownerNameError = formik.touched.ownerName && formik.errors.ownerName;
  const repositoryNameError = formik.touched.repositoryName && formik.errors.repositoryName;
  const ratingError = formik.touched.rating && formik.errors.rating;

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        style={[styles.input,  ownerNameError && { borderColor: '#d73a4a' }]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
      />
      {repositoryNameError && <Text style={{ color: 'red' }}>{formik.errors.ownerName}</Text>}

      <TextInput
        autoCapitalize="none"
        style={[styles.input, repositoryNameError && { borderColor: '#d73a4a' }]}
        placeholder="Repository Name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
      />
      {repositoryNameError && <Text style={{ color: 'red' }}>{formik.errors.repositoryName}</Text>}

      <TextInput
        autoCapitalize="none"
        style={[styles.input, ratingError && { borderColor: '#d73a4a' }]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
      />
      {ratingError && <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>}

      <TextInput
        autoCapitalize="none"
        style={[styles.input]}
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
        multiline
      />

      <Pressable testID="submitButton" style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default CreateReviewContainer;
