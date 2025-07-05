import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges {
            node {
                id
                ownerAvatarUrl
                fullName
                description
                language
                ratingAverage
                reviewCount
                stargazersCount
                forksCount
            }
        }
    }
  }
`;



// other queries...