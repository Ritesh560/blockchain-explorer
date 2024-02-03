import React from 'react';
import styles from './Home.module.scss';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import { useUser } from '../../lib/data-access/src';
import useWallet from '../../lib/data-access/src/lib/useWallet';

const Home = () => {
  const { userInfo } = useUser();
  const { walletData, fetchingWalletData } = useWallet({ walletAddress: userInfo?.wallet_address });

  const formatDate = (date) => {
    const dateObj = new Date(date);

    // Format the date
    const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
    // const formattedTime = `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;

    return formattedDate;
  };

  return (
    <div>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>BlockChain Explorer</div>
        <ul className={styles.navLinks}>
          <li>Home</li>
          <li>Notifications</li>
          <li>Wallet Details</li>
        </ul>
      </nav>

      {/* Main content */}
      <div className={styles.container}>
        <div className={styles.profile}>
          <ProfilePicture className={styles.avatar} alt="Avatar" />
          <div className={styles.profileInfo}>
            <h1 className={styles.name}>{userInfo?.name}</h1>
            <p className={styles.email}>{userInfo?.email}</p>
            <p className={styles.walletAddress}>Wallet Address: {userInfo?.wallet_address}</p>
          </div>
          <div className={styles.balance}>
            <p className={styles.balanceLabel}>Balance</p>
            <p className={styles.balanceAmount}>
              {parseFloat(walletData?.balance?.native)?.toFixed(3)} ETH
            </p>
          </div>
        </div>
        <div className={styles.transactions}>
          <h2 className={styles.transactionsHeading}>Recent Transactions</h2>
          <div className={styles.transactionList}>
            {walletData?.transections.map((transaction) => (
              <div key={transaction.id} className={styles.transaction}>
                <p className={styles.transactionType}>{'Receive'}</p>
                <p className={styles.transactionAmount}>{transaction?.amount / 10 ** 18} ETH</p>
                <p className={styles.transactionDate}>{formatDate(transaction?.date)}</p>
              </div>
            ))}
          </div>
        </div>
        {/* <button className={styles.viewTransactionsButton}>View All Transactions</button> */}
      </div>
    </div>
  );
};

export default Home;
