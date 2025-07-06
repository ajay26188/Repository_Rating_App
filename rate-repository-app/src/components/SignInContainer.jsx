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
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema,
    onSubmit,
  });

  const usernameError = formik.touched.username && formik.errors.username;
  const passwordError = formik.touched.password && formik.errors.password;

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        testID="usernameInput"
        style={[styles.input, usernameError && { borderColor: '#d73a4a' }]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {usernameError && <Text style={{ color: 'red' }}>{formik.errors.username}</Text>}

      <TextInput
        autoCapitalize="none"
        testID="passwordInput"
        style={[styles.input, passwordError && { borderColor: '#d73a4a' }]}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {passwordError && <Text style={{ color: 'red' }}>{formik.errors.password}</Text>}

      <Pressable testID="submitButton" style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignInContainer;
