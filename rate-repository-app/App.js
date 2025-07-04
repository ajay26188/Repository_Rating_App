import Main from './src/components/Main';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {NativeRouter} from 'react-router-native';


const App = () => {
  return (
    <NativeRouter>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </NativeRouter>

  );
}
export default App;