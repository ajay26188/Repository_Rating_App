import Main from './src/components/Main';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {NativeRouter} from 'react-router-native';
import {ApolloProvider} from '@apollo/client';

import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();

const App = () => {
  return (
    <NativeRouter>
      <SafeAreaProvider>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>  
      </SafeAreaProvider>
    </NativeRouter>

  );
}
export default App;