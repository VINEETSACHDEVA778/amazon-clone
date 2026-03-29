import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

function Auth() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isLogin
        ? 'http://localhost:5000/api/auth/login'
        : 'http://localhost:5000/api/auth/register';

      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const res = await axios.post(url, payload);

      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__container">

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon"
          className="auth__logo"
        />

        <div className="auth__box">
          <h2 className="auth__title">
            {isLogin ? 'Sign in' : 'Create account'}
          </h2>

          {error && <div className="auth__error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth__form">

            {!isLogin && (
              <div className="auth__field">
                <label>Your name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="First and last name"
                  required
                />
              </div>
            )}

            <div className="auth__field">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="auth__field">
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder={isLogin ? 'Enter password' : 'At least 6 characters'}
                required
              />
            </div>

            <button
              type="submit"
              className="auth__submitBtn"
              disabled={loading}
            >
              {loading
                ? 'Please wait...'
                : isLogin ? 'Sign in' : 'Create your account'}
            </button>
          </form>

          <div className="auth__divider">
            <span>New to Amazon?</span>
          </div>

          <button
            className="auth__switchBtn"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
          >
            {isLogin ? 'Create your account' : 'Already have an account? Sign in'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Auth;