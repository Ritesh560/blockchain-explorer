import { AuthorizedApi } from './api';
import { useQuery } from 'react-query';

const QUERY_KEY = {
  userInfo: 'user_info'
};

const useUser = () => {
  const fetchUserApi = async () => {
    return AuthorizedApi.get('/api/auth')
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  };

  const { data: userInfo, isLoading: fetchingUser } = useQuery([QUERY_KEY.userInfo], fetchUserApi, {
    enabled: true
  });

  return {
    userInfo,
    fetchingUser
  };
};

export default useUser;
