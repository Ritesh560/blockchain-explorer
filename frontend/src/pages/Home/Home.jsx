import React from 'react';
import styles from './Home.module.scss';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';

const Home = () => {
  const userData = {
    name: 'John Doe',
    walletAddress: '0x1234567890123456789012345678901234567890',
    email: 'john.doe@example.com',
    balance: 100,
    transactions: [
      { id: 1, type: 'Receive', amount: 50.2, date: '2022-01-01' },
      { id: 2, type: 'Send', amount: 25.3, date: '2022-01-02' },
      { id: 3, type: 'Receive', amount: 75.1, date: '2022-01-03' }
    ]
  };

  return (
    <div>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>Your Logo</div>
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
            <h1 className={styles.name}>{userData.name}</h1>
            <p className={styles.email}>{userData.email}</p>
            <p className={styles.walletAddress}>Wallet Address: {userData.walletAddress}</p>
          </div>
          <div className={styles.balance}>
            <p className={styles.balanceLabel}>Balance</p>
            <p className={styles.balanceAmount}>{userData.balance} ETH</p>
          </div>
        </div>
        <div className={styles.transactions}>
          <h2 className={styles.transactionsHeading}>Recent Transactions</h2>
          <div className={styles.transactionList}>
            {userData.transactions.map((transaction) => (
              <div key={transaction.id} className={styles.transaction}>
                <p className={styles.transactionType}>{transaction.type}</p>
                <p className={styles.transactionAmount}>{transaction.amount} ETH</p>
                <p className={styles.transactionDate}>{transaction.date}</p>
              </div>
            ))}
          </div>
        </div>
        <button className={styles.viewTransactionsButton}>View All Transactions</button>
      </div>
    </div>
  );
};

export default Home;
