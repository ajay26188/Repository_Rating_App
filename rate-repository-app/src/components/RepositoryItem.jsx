import {View, StyleSheet, Image} from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import Text from './Text'
import theme from '../theme'

const RepositoryItem = ({repository}) => {
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
});

const getNumber = (number) => {
    const newNumber = ((number/1000).toFixed(1));
    return `${newNumber}k`
};

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={styles.rowContainer}>
                    <Image
                    source={{ uri: repository.ownerAvatarUrl }}
                    style={styles.avatar}
                    />
                    <View style={styles.textContainer}>
                    <Text fontWeight='bold' style={styles.textItem}>{repository.fullName}</Text>
                    <Text style={styles.textItem}>{repository.description}</Text>
                    <Text style={styles.languageContainer}>{repository.language}</Text>
                    </View>
                </View>
            </SafeAreaView>

            <View style={styles.statsContainer}>
                <View style={styles.statBlock}>
                    <Text style={styles.statNumber}>
                    {repository.stargazersCount > 1000
                        ? getNumber(repository.stargazersCount)
                        : repository.stargazersCount}
                    </Text>
                    <Text style={styles.statLabel}>Stars</Text>
                </View>

                <View style={styles.statBlock}>
                    <Text style={styles.statNumber}>
                    {repository.forksCount > 1000
                        ? getNumber(repository.forksCount)
                        : repository.forksCount}
                    </Text>
                    <Text style={styles.statLabel}>Forks</Text>
                </View>

                <View style={styles.statBlock}>
                    <Text style={styles.statNumber}>{repository.reviewCount}</Text>
                    <Text style={styles.statLabel}>Reviews</Text>
                </View>

                <View style={styles.statBlock}>
                    <Text style={styles.statNumber}>{repository.ratingAverage}</Text>
                    <Text style={styles.statLabel}>Rating</Text>
                </View>
                </View>
        </View>
)
}
export default RepositoryItem;