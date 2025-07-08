import { Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import {Link} from 'react-router-native';
import { ME } from '../graphql/queries';
import {useQuery} from '@apollo/client';
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";

const AppBarTab = () => {
  const authStorage = useAuthStorage()
  const { data, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });
  
  const apolloClient = useApolloClient();
  let navigate = useNavigate();

  const user = data?.me;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#24292e', 
      paddingTop: 40,
      paddingBottom: 10,
      paddingHorizontal: 10,
    },
    tab: {
      padding: 15,
    },
    tabText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

  const signOut = async () => {
    await authStorage.removeAccessToken('auth:tokens');
    apolloClient.resetStore();
    navigate('/sign-in');
    console.log('signedout');
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.tab} onPress={() => console.log("Repositories pressed")}>
        <Link to='/'>
            <Text color="white" style={styles.tabText}>Repositories</Text>
        </Link>
        
      </Pressable>

      {user ? (
        <Pressable style={styles.tab}>
          <Link to='/create-a-review'>
            <Text color="white" style={styles.tabText}>Create a review</Text>
          </Link>
      </Pressable>
      ) : null
    }

    {user ? (
        <Pressable style={styles.tab}>
          <Link to='/my-reviews'>
            <Text color="white" style={styles.tabText}>My reviews</Text>
          </Link>
      </Pressable>
      ) : null
    }

      {user ? (
        <Pressable style={styles.tab} onPress={signOut}>
          <Text color="white" style={styles.tabText}>Sign out</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.tab}>
          <Link to='/sign-in'>
            <Text color="white" style={styles.tabText}>Sign in</Text>
          </Link>
        </Pressable>
      )}

      {user ? null : (
        <Pressable style={styles.tab}>
          <Link to='/sign-up'>
            <Text color="white" style={styles.tabText}>Sign up</Text>
          </Link>
      </Pressable>
      )
    } 
      
    </View>
  );
};

export default AppBarTab;
