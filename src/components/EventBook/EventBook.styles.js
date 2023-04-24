import styled from "styled-components";

import { shadow } from "../../constants/colors";

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const BookEventPlaceholder = styled.div`
  top: 20vh;
  position: relative;
  padding: 10px 0;
  background-color: #ddd;
  box-shadow: ${shadow};
`;

export const BookEventForm = styled.form`
  margin: 1rem 0;
  padding: 0 10px;
`;

export const BookEventSubmitButton = styled.div`
  color: black;
  margin: auto;
  padding: 10px;
  height: 20px;
  width: 20px;
  border: 1px solid black;
  border-radius: 50%;

  & svg {
    color: inherit;
    font-size: inherit;
    vertical-align: inherit;
  }
`;

export const BookEventInput = styled.input`
  background-color: transparent;
  height: 25px;
  width: ${props => (props.title ? "50%" : "90%")};
  border: none;
  margin-left: 5px;
  padding: 0 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);

  &:-webkit-autofill {
    -webkit-transition-delay: 99999s;
  }
`;

export const BookEventDuration = styled.div`
  margin-left: 50px;
  display: inline-block;
`;

export const BookEventWarning = styled.p`
  font-size: 0.8rem;
  padding-left: 10px;
  margin: 0;
  color: ${props => (props.error ? "rgba(255, 0, 0, 0.8)" : "grey")};
`;
