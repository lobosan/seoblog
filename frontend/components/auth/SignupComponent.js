import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import { isAuth, signup } from '../../actions/auth';

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: 'Santiago Galindo',
    email: 'sp.galindoh@gmail.com',
    password: '123123',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const { name, email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push('/');
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    signup(user).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          loading: false,
          message: data.message,
          showForm: false
        });
      }
    });
  };

  const handleChange = input => event => {
    setValues({ ...values, error: false, [input]: event.target.value });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : '';
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : '';
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : '';

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={name}
            className="form-control"
            placeholder="Type your name"
            onChange={handleChange('name')}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={email}
            className="form-control"
            placeholder="Type your email"
            onChange={handleChange('email')}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            className="form-control"
            placeholder="Type your password"
            onChange={handleChange('password')}
          />
        </div>
        <div>
          <button className="btn btn-primary">Signup</button>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
    </React.Fragment>
  );
};

export default SignupComponent;
