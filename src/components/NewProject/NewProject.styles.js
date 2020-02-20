import styled from "styled-components";

import { shadow } from "../../constants/colors";

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const NPPlaceholder = styled.div`
  top: 10vh;
  position: relative;
  padding: 10px 0;
  background-color: #ddd;
  box-shadow: ${shadow};
`;

export const NPForm = styled.form`
  margin: 1rem 0;
  padding: 0 10px;
`;

export const NPSubmitButton = styled.div`
  color: ${props => (props.title ? "black" : "grey")};
  margin: 10px auto 0;
  padding: 10px;
  height: 20px;
  width: 20px;
  border: 1px solid ${props => (props.title ? "black" : "grey")};
  border-radius: 50%;

  & svg {
    color: inherit;
    font-size: inherit;
    vertical-align: inherit;
  }
`;

export const NPInput = styled.input`
  background-color: transparent;
  height: 25px;
  width: 90%;
  border: none;
  margin-left: 5px;
  padding: 10px 5px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);

  &:-webkit-autofill {
    -webkit-transition-delay: 99999s;
  }
`;

export const NPWarning = styled.p`
  font-size: 0.8rem;
  padding-left: 10px;
  margin: 0;
  color: ${props =>
    props.loading === "true" ? "inherit" : "rgba(255, 0, 0, 0.8)"};
`;
