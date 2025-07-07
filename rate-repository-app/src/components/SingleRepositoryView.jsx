import { View, Pressable, StyleSheet, FlatList, SafeAreaView } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { GET_SINGLE_REPOSITORY, GET_REVIEWS } from "../graphql/queries";
import {useQuery} from '@apollo/client';
import {useParams} from 'react-router-native';
import Text from "./Text";
import { format } from 'date-fns';
import theme from "../theme";

const SingleRepositoryView = () => {
    const {id} = useParams();

    const { data: repoData, loading: repoLoading } = useQuery(GET_SINGLE_REPOSITORY, {
        variables: { id }
      });
    
    const { data: reviewsData, loading: reviewsLoading } = useQuery(GET_REVIEWS, {
        variables: {id }
    });
    
    if (repoLoading || reviewsLoading) return <Text>Loading...</Text>;

    const styles = StyleSheet.create({
        separator: {
          height: 10,
          backgroundColor: '#f0f0f0',
        },
      });

    const reviews = reviewsData ? reviewsData.repository.reviews.edges.map(edge => edge.node) : [];

    const ItemSeparator = () => <View style={styles.separator} />;

    const ReviewItem = ({ review }) => {
        const styles = StyleSheet.create({
          container: {
            flexDirection: 'row',
            padding: 15,
            backgroundColor: 'white',
          },
          ratingContainer: {
            width: 50,
            height: 50,
            borderRadius: 25,
            borderWidth: 2,
            borderColor: theme.colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 15,
          },
          ratingText: {
            color: theme.colors.primary,
            fontWeight: 'bold',
            fontSize: 18,
          },
          contentContainer: {
            flex: 1,
          },
          username: {
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: 4,
          },
          date: {
            color: '#555',
            marginBottom: 6,
          },
          reviewText: {
            fontSize: 15,
            lineHeight: 20,
          }
        });
      
        return (
          <View style={styles.container}>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{review.rating}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.username}>{review.user.username}</Text>
              <Text style={styles.date}>
                {format(new Date(review.createdAt), 'dd.MM.yyyy')}
              </Text>
              <Text style={styles.reviewText}>{review.text}</Text>
            </View>
          </View>
        );
      };
    

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => (
                <>
                  <RepositoryItem repository={repoData.repository} singleView={true} />
                  <ItemSeparator />
                </>
              )}
            ItemSeparatorComponent={ItemSeparator}
    />
    )
};

export default SingleRepositoryView;

/*
<View style={{ flex: 1 }}>
</View>
*/
