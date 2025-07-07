import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import Text from './Text'; 
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
    username: yup
      .string()
      .required('Username is required')
      .min(5, 'Username must be at least 5 characters')
      .max(30, 'Username must be at most 30 characters'),
      
    password: yup
      .string()
      .required('Password is required')
      .min(5, 'Password must be at least 5 characters')
      .max(30, 'Password must be at most 30 characters'),

    confirmPassword: yup
        .string()
        .required('Password confirmation is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  

const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema,
    onSubmit,
  });

  const usernameError = formik.touched.username && formik.errors.username;
  const passwordError = formik.touched.password && formik.errors.password;
  const passwordConfirmationError = formik.touched.confirmPassword && formik.errors.confirmPassword;

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        style={[styles.input, usernameError && { borderColor: '#d73a4a' }]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {usernameError && <Text style={{ color: 'red' }}>{formik.errors.username}</Text>}

      <TextInput
        autoCapitalize="none"
        style={[styles.input, passwordError && { borderColor: '#d73a4a' }]}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {passwordError && <Text style={{ color: 'red' }}>{formik.errors.password}</Text>}

      <TextInput
        autoCapitalize="none"
        style={[styles.input, passwordConfirmationError && { borderColor: '#d73a4a' }]}
        placeholder="Password"
        secureTextEntry
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
      />
      {passwordConfirmationError && <Text style={{ color: 'red' }}>{formik.errors.confirmPassword}</Text>}

      <Pressable testID="submitButton" style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SignUpContainer;
