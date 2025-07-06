import {View, StyleSheet, Image, Pressable} from 'react-native'
import Text from './Text'
import theme from '../theme'
import { useState } from 'react'
import RepositoryView from './RepositoryView'

const RepositoryItem = ({repository}) => {
  const [singleView, setSingleView] = useState(false);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 5,
            borderWidth: 1,
            borderColor: '#ddd',  
            borderRadius: 6,      
            backgroundColor: '#fff',
          },
          rowContainer: {
            flexDirection: 'row',
            alignItems: 'center',
          },
          avatar: {
            width: 60,
            height: 60,
            borderRadius: 8,
            marginRight: 12,
          },

          textContainer: {
            flex: 1,
          },

          textItem: {
            marginBottom: 6,
          },

          languageContainer: {
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderColor: '#ddd',
            borderRadius: 4,
            backgroundColor: theme.colors.primary,
            alignSelf: 'flex-start',
          },
          

        child: {
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        statsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 12,
          },
          statBlock: {
            alignItems: 'center',
          },
          statNumber: {
            fontWeight: 'bold',
            fontSize: 16,
          },
          statLabel: {
            color: '#555',
            fontSize: 14,
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

return (
  singleView ?  (
    <View style={styles.container}>
      <RepositoryView repository={repository} setSingleView={setSingleView} />
      <Pressable style={styles.button} onPress={() => console.log('single view')}>
        <Text style={styles.buttonText}>Open in Github</Text>
      </Pressable>
    </View>
  ): 
  (
    <RepositoryView repository={repository} setSingleView={setSingleView} />
  )
);

}

export default RepositoryItem;

