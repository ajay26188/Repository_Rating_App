import { Pressable, View } from "react-native";
import Text from "./Text";
import { ME } from "../graphql/queries";
import {useQuery} from '@apollo/client';
import { FlatList, StyleSheet } from "react-native";
import theme from "../theme";
import { format } from 'date-fns';
import {useNavigate} from 'react-router-native';
import { DELETE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { Alert, Platform } from "react-native";

const MyReviews = () => {
    const { data, refetch } = useQuery(ME, {
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
        const [deleteReview] = useMutation(DELETE_REVIEW)

        let navigate = useNavigate();
        const handleView = (id) => {
            navigate(`/${id}`);
            refetch();
        }

        const handleDelete = (id) => {
            if (Platform.OS === 'web') {
              const confirm = window.confirm('Are you sure you want to delete this review?');
              if (!confirm) return;
          
              deleteReview({ variables: { id } })
                .then(() => refetch())
                .catch((error) => {
                  console.error('Error deleting review:', error.message);
                });
            } else {
              Alert.alert(
                'Delete Review',
                'Are you sure you want to delete this review?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                      try {
                        await deleteReview({ variables: { id } });
                        refetch();
                      } catch (error) {
                        console.error('Error deleting review:', error.message);
                      }
                    }
                  },
                ]
              );
            }
          };

        const styles = StyleSheet.create({
          container: {
            padding: 15,
            backgroundColor: 'white',
          },
          topRow: {
            flexDirection: 'row',
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
          rightContent: {
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
            marginBottom: 10,
          },
          buttonsRow: {
            flexDirection: 'row',
            justifyContent: 'space-between' 
          },
          button: {
            paddingVertical: 12,
            borderRadius: 6,
            marginBottom: 10,
            alignItems: 'center',
          },
          viewButton: {
            backgroundColor: '#0366d6',
          },
          deleteButton: {
            backgroundColor: '#d73a4a',
          },
          buttonText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
            padding: 6
          },
        });
      
        return (
          <View style={styles.container}>
            <View style={styles.topRow}>
              {/* Left: Rating circle */}
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{review.rating}</Text>
              </View>
      
              
              <View style={styles.rightContent}>
                <Text style={styles.username}>{review.repository.fullName}</Text>
                <Text style={styles.date}>
                  {format(new Date(review.createdAt), 'dd.MM.yyyy')}
                </Text>
                <Text style={styles.reviewText}>{review.text}</Text>
      
                <View style={styles.buttonsRow}>
                    <Pressable style={[styles.button, styles.viewButton]} onPress={() => handleView(review.repository.id)}>
                    <Text style={styles.buttonText}>View repository</Text>
                    </Pressable>

                    <Pressable style={[styles.button, styles.deleteButton]} onPress={() => handleDelete(review.id)}>
                    <Text style={styles.buttonText}>Delete review</Text>
                    </Pressable>
                </View>
              </View>
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