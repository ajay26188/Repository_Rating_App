import { Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import {Link} from 'react-router-native'

const AppBarTab = () => {
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

  return (
    <View style={styles.container}>
      <Pressable style={styles.tab} onPress={() => console.log("Repositories pressed")}>
        <Link to='/'>
            <Text color="white" style={styles.tabText}>Repositories</Text>
        </Link>
        
      </Pressable>

      <Pressable style={styles.tab} onPress={() => console.log("Sign in pressed")}>
        <Link to='/sign-in'>
            <Text color="white" style={styles.tabText}>Sign in</Text>
        </Link>
      </Pressable>

      
    </View>
  );
};

export default AppBarTab;
