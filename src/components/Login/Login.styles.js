import styled from "styled-components";

import { shadow } from "../../constants/colors";

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const LoginPlaceholder = styled.div`
  margin: auto;
  top: 31vh;
  position: relative;
  padding: 10px 0;
  background-color: #ddd;
  box-shadow: ${shadow};
`;

export const LoginForm = styled.form`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: auto 50px;
  grid-template-rows: auto auto;
  grid-gap: 10px;
  padding: 0 10px;
`;

export const LoginSubmitButton = styled.div`
  color: ${props =>
    props.email && props.password && !props.apiError ? "black" : "grey"};
  grid-row: span 2;
  margin: auto;
  padding: 10px;
  height: 20px;
  width: 20px;
  border: 1px solid
    ${props =>
      props.email && props.password && !props.apiError ? "black" : "grey"};
  border-radius: 50%;
`;

export const LoginInput = styled.input`
  background-color: transparent;
  height: 25px;
  width: 90%;
  border: none;
  margin-left: 5px;
  padding: 0 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);

  &:-webkit-autofill {
    -webkit-transition-delay: 99999s;
  }
`;

export const LoginWarning = styled.p`
  font-size: 0.8rem;
  padding-left: 10px;
  margin: 0;
  color: ${props =>
    props.loading === "true" ? "inherit" : "rgba(255, 0, 0, 0.8)"};
`;
