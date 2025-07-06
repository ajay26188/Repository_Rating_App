import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';


const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  return <RepositoryListContainer repositories={repositories} loading={loading} />;
};

export default RepositoryList;