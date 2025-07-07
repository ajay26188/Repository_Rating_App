import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $ownerName: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      ownerName: $ownerName
      first: $first
      after: $after
    ) {
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


export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      ownerAvatarUrl
      url
    }
  }
`;

export const GET_REVIEWS = gql`
  query GetReviews($id : ID!) {
      repository(id: $id) {
        id
        fullName
        reviews {
          edges {
            node {
              id
              text
              rating
              createdAt
              user {
                id
                username
              }
            }
          }
        }
    }
  }
`;



// other queries...