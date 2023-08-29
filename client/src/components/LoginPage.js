import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaGoogle } from 'react-icons/fa';
import { loginUser, googleLogin } from '../slices/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const userData = { email, password };
    dispatch(loginUser(userData));
  };

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-8 w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-indigo-600"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md shadow-md hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex items-center justify-center w-full bg-red-600 text-white font-semibold py-2 rounded-md shadow-md hover:bg-red-700"
          >
            <FaGoogle className="mr-2" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
