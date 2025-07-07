import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import {useQuery} from '@apollo/client'

const useRepositories = (pickerValue) => {
  let variables = {};

  if (pickerValue === 'latest') {
    variables = { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
  } else if (pickerValue === 'highest') {
    variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
  } else if (pickerValue === 'lowest') {
    variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
  }

  const {data, loading} = useQuery(GET_REPOSITORIES,{
    fetchPolicy: 'cache-and-network',
    variables
  });

  const repositories = data?.repositories;

  return { loading, repositories };
};

export default useRepositories;