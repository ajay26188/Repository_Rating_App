import { Text, TextInput, Pressable, View } from 'react-native';
import { useFormik } from 'formik';

const styles = {
    container: {
        padding: 12
    },
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
};
  

const initialValues = {
  username: '',
  password: '',
};

const onSubmit = (values) => {
    console.log(values);
  };


const SignIn = () => {
  const formik = useFormik({
    initialValues,
    onSubmit
});

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;