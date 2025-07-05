import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import {useQuery} from '@apollo/client'

const useRepositories = () => {
  const {data, loading} = useQuery(GET_REPOSITORIES,{
    fetchPolicy: 'cache-and-network'
  });

  const repositories = data?.repositories;

  return { loading, repositories };
};

export default useRepositories;