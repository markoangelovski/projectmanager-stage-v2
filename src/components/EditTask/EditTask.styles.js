import styled from "styled-components";

import { shadow } from "../../constants/colors";

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const ETPlaceholder = styled.div`
  top: 10vh;
  position: relative;
  padding: 10px 0;
  background-color: #ddd;
  box-shadow: ${shadow};
`;

export const ETForm = styled.form`
  margin: 1rem 0;
  padding: 0 10px;
`;

export const ETSubmitButton = styled.div`
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

export const ETInput = styled.input`
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

export const ETSelect = styled.select`
  width: 95%;
  height: 25px;
  border: none;
  padding: 10px 5px 0;
`;

export const ETDone = styled.div`
  height: 25px;
  width: 90%;
  margin-left: 5px;
  padding: 10px 5px 0;
  font-size: 0.9rem;

  input {
    position: relative;
    top: 2px;
    margin-left: 10px;
  }
`;

export const ETDate = styled.div`
  display: flex;
  width: 95%;
  height: 25px;
  padding: 10px 5px 0;

  label {
    white-space: nowrap;
    margin: 0 5px;
    font: 400 13.3333px Arial;
    padding-top: 5px;
  }

  input {
    width: 100%;
    background: none;
    border: none;
    padding-left: 25%;
  }
`;

export const ETWarning = styled.p`
  font-size: 0.8rem;
  padding-left: 10px;
  margin: 0;
  color: ${props =>
    props.loading === "true" ? "inherit" : "rgba(255, 0, 0, 0.8)"};
`;
