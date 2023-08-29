import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserPlus } from 'react-icons/fa';
import { registerUser } from '../slices/authSlice';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const userData = { name, email, password };
    dispatch(registerUser(userData));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-8 w-96">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-indigo-600"
            />
          </div>
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
            <FaUserPlus className="mr-2" />
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
