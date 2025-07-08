import { View } from "react-native";
import Text from "./Text";
import { ME } from "../graphql/queries";
import {useQuery} from '@apollo/client';
import { FlatList, StyleSheet } from "react-native";
import theme from "../theme";
import { format } from 'date-fns';

const MyReviews = () => {
    const { data, loading } = useQuery(ME, {
        fetchPolicy: 'cache-and-network',
        variables: {includeReviews: true}
    });

    const reviews = data
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

    const styles = StyleSheet.create({
        separator: {
          height: 10,
          backgroundColor: '#f0f0f0',
        },
      });

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
              <Text style={styles.username}>{review.repository.fullName}</Text>
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
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
   
}

export default MyReviews;