import React, { useContext, useState } from 'react';
import styles from './LoginSignup.module.scss';

import { Link } from 'react-router-dom';
import { MessageContext } from '../../lib/contexts/MessageContext';
import { Eye, EyeOff } from '../../icons';
import { useSignup } from '../../lib/data-access/src';

const Signup = () => {
  const { signup, signing } = useSignup();
  const [input, setInput] = useState({ name: '', email: '', password: '', wallet_address: '' });
  const [showPassword, setShowPassword] = useState(false);

  const { addError } = useContext(MessageContext);

  const saveUser = (user) => {
    localStorage.setItem('accessToken', user?.token);

    window.location.href = '/';
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      input.name === '' ||
      input.email === '' ||
      input.password === '' ||
      input.walletAddress === ''
    ) {
      addError('All fields are required');
      return;
    }

    signup(input, {
      onError: (err) => {
        console.log(err);
        addError(err.response.data.errors[0].msg);
      },
      onSuccess: (user) => {
        saveUser(user);
      }
    });
  };

  return (
    <div onKeyDown={(e) => e.key === 'Enter' && onSubmit(e)} className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.logo}>BlockChain Explorer</div>
        <div className={styles.header_text}>Sign up</div>
        <div className={styles.inputBox}>
          <label>Name</label>
          <div>
            <input
              height="53px"
              type="text"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              name="name"
              placeholder="Name"
            />
          </div>
        </div>
        <div className={styles.inputBox}>
          <label>Email</label>
          <div>
            <input
              height="53px"
              type="text"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              name="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div className={styles.inputBox}>
          <label>Wallet Address</label>
          <div>
            <input
              height="53px"
              type="text"
              value={input.wallet_address}
              onChange={(e) => setInput({ ...input, wallet_address: e.target.value })}
              name="wallet_address"
              placeholder="Enter your blockchain address"
            />
          </div>
        </div>
        <div className={styles.inputBox}>
          <label>Password</label>
          <div className={styles.inputPassword}>
            <input
              height="53px"
              type={showPassword ? 'text' : 'password'}
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              name="password"
              placeholder="Password"
            />
            {showPassword ? (
              <EyeOff className={styles.eye} onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <Eye
                className={styles.eye}
                color="#567191"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>
        <button
          onClick={(e) => {
            !signing && onSubmit(e);
          }}>
          {signing ? 'loading...' : 'Sign up'}
        </button>
        <Link to="/login">
          <button className={styles.login}>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
