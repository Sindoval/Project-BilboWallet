import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from '../redux/actions';

function Login() {
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const validEmail = (email: string) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    };

    const validPassword = (password: string) => {
      return password.length >= 6;
    };

    if (validEmail(user.email) && validPassword(user.password)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user.email, user.password]);

  const buttonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(sendEmail(user.email));
    navigate('/carteira');
  };

  return (
    <>
      <h1>Login</h1>
      <div>
        <form action="">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            data-testid="email-input"
            value={ user.email }
            onChange={ (e) => setUser({ ...user, email: e.target.value }) }
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            data-testid="password-input"
            value={ user.password }
            onChange={ (e) => setUser({ ...user, password: e.target.value }) }
          />

          <button
            disabled={ disabled }
            onClick={ buttonClick }
          >
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
