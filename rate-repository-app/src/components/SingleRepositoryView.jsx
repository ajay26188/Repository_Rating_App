import { View, Pressable, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import {useQuery} from '@apollo/client';
import {useParams} from 'react-router-native';
import Text from "./Text";

const SingleRepositoryView = () => {
    const {id} = useParams();

    const {data, loading} = useQuery(GET_SINGLE_REPOSITORY, {
        variables: {id}
    });

    if (loading) return <Text>Loading ...</Text>

    return (
        <View style={{ flex: 1 }}>
            <RepositoryItem repository={data.repository} singleView={true}/>
        </View>
    )
};

export default SingleRepositoryView;