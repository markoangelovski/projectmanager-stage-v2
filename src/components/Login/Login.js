import React, { useState } from "react";
import {
  logInCall /* ,
  logOutCall,
  checkAuthCall */
} from "../../lib/drivers/User/user.driver";

const Login = props => {
  const { setLoggedInStatus, setUser, apiError } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Unsuccessfull login
  const [loginError, setLoginError] = useState(false);

  const authFoo = async e => {
    e.preventDefault();
    setLoginError(false);

    const payload = {
      email,
      password
    };

    const login = await logInCall(payload);
    if (login.error) setLoginError(true);

    if (login.user) {
      setUser(login.user);
      setLoggedInStatus(true);
    }
  };

  return (
    <form onSubmit={authFoo}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <p style={{ display: !loginError ? "none" : "" }}>
        Incorrect credentials, please try again
      </p>
      <input
        type="submit"
        className="btn btn-primary"
        value="Submit"
        disabled={apiError}
      />
    </form>
  );
};

export default Login;
