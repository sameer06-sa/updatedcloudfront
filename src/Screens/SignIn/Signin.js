import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Check } from 'lucide-react';
import styles from './Signin.module.css';
const apiUrl = process.env.REACT_APP_API_URL;
 
const Signin = () => {
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
 
  const validateForm = () => {
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    return true;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!validateForm()) {
      return;
    }
 
    setLoading(true);
    setError('');
 
    try {
      const response = await fetch(`${apiUrl}/api/user/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
 
      const data = await response.json();
      console.log('Full response from backend:', data);  // Log the full response to inspect the structure
 
      if (data && data.data && data.data.token) {
        // Store token in localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('userData', JSON.stringify({
          email: formData.email,
          fullName: data.data.user.fullName,
        }));
 
        setShowToast(true);
 
        // Navigate to verify-identity page after a delay
        setTimeout(() => {
          setShowToast(false);
          navigate('/verify-identity', { state: { email: formData.email } });
        }, 2000);
      } else {
        setError('Token missing in response');
      }
    } catch (error) {
      console.error('Signin Error:', error);
      setError('Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
    setError('');
  };
 
  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Please sign in to continue</p>
        </div>
        <div className={styles.formContent}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <Mail className={styles.inputIcon} size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
 
            {error && (
              <div className={styles.errorMessage}>
                <AlertCircle size={16} />
                {error}
              </div>
            )}
 
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
 
            <p className={styles.signupText}>
              Don't have an account?{' '}
              <a href="/" className={styles.signupLink}>
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
 
      {showToast && (
        <div className={styles.toast}>
          <Check size={16} />
          Signed in successfully!
        </div>
      )}
    </div>
  );
};
 
export default Signin;