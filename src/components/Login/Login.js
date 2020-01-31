import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

import {
  logInCall /* ,
  logOutCall,
  checkAuthCall */
} from "../../lib/drivers/User/user.driver";

import {
  Background,
  LoginPlaceholder,
  LoginForm,
  LoginInput,
  LoginSubmitButton,
  LoginWarning
} from "./Login.styles";

const Login = props => {
  const { setLoggedInStatus, setUser, apiError } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // Unsuccessfull login
  const [loginError, setLoginError] = useState(false);

  const authFoo = async e => {
    e.preventDefault();
    setLoginError(false);
    setLoading(true);

    const payload = {
      email,
      password
    };

    const login = email && password && !apiError && (await logInCall(payload));
    if (login.error) {
      setLoginError(true);
      setLoading(false);
    }

    if (login.user) {
      setUser(login.user);
      setLoggedInStatus(true);
      setLoading(false);
    }
  };

  return (
    <Background>
      <LoginPlaceholder>
        <LoginForm>
          <div>
            <LoginInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <LoginSubmitButton
            email={email ? email.toString() : undefined}
            password={password ? password.toString() : undefined}
            apiError={apiError ? apiError.toString() : undefined}
          >
            <FaPaperPlane onClick={e => !apiError && authFoo(e)} />
          </LoginSubmitButton>
          <div>
            <LoginInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {loading && (
            <LoginWarning loading={loading ? loading.toString() : undefined}>
              Loading...
            </LoginWarning>
          )}
          {loginError && (
            <LoginWarning>
              Incorrect credentials, please try again.
            </LoginWarning>
          )}
          {apiError && (
            <LoginWarning>
              Service is currently unavailable, please try again later.
            </LoginWarning>
          )}
        </LoginForm>
      </LoginPlaceholder>
    </Background>
  );
};

export default Login;
