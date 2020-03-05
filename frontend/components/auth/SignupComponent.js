import { useState } from 'react';

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

  const handleSubmit = event => {
    event.preventDefault();
    console.table({ name, email, password, error, loading, message, showForm });
  };

  const handleChange = input => event => {
    setValues({ ...values, error: false, [input]: event.target.value });
  };

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

  return <React.Fragment>{signupForm()}</React.Fragment>;
};

export default SignupComponent;
