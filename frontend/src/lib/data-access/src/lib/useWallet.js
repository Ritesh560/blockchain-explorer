import { AuthorizedApi } from './api';
import { useQuery } from 'react-query';

const QUERY_KEY = {
  walletBalance: 'wallet_balance'
};

const useWallet = ({ walletAddress }) => {
  const fetchWalletApi = async () => {
    return AuthorizedApi.get(`/api/wallet/${walletAddress}`)
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  };

  const { data: walletData, isLoading: fetchingWalletData } = useQuery(
    [QUERY_KEY.walletBalance, { walletAddress }],
    fetchWalletApi,
    {
      enabled: !!walletAddress
    }
  );

  return {
    walletData,
    fetchingWalletData
  };
};

export default useWallet;
