import Main from './src/components/Main';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {NativeRouter} from 'react-router-native';
import {ApolloProvider} from '@apollo/client';

import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import { Provider as PaperProvider } from 'react-native-paper';


const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <NativeRouter>
      <SafeAreaProvider>
        <ApolloProvider client={apolloClient}>
         <AuthStorageContext.Provider value={authStorage}>
          <PaperProvider>
            <Main />
          </PaperProvider>
        </AuthStorageContext.Provider>
      </ApolloProvider>  
      </SafeAreaProvider>
    </NativeRouter>

  );
}
export default App;