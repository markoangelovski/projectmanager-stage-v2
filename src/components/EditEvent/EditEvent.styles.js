import styled from "styled-components";

import { primary, shadow } from "../../constants/colors";

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const EditEventPlaceholder = styled.div`
  margin: auto;
  top: 31vh;
  position: relative;
  padding: 10px 0;
  background-color: #ddd;
  box-shadow: ${shadow};
`;

export const EditEventForm = styled.form`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: auto 50px;
  grid-template-rows: auto auto;
  grid-gap: 10px;
  padding: 0 10px;
`;

export const EditEventSubmitButton = styled.div`
  color: ${props => (props.eventTitle ? "black" : "grey")};
  grid-row: span 2;
  margin: auto;
  padding: 10px;
  height: 20px;
  width: 20px;
  border: 1px solid ${props => (props.eventTitle ? "black" : "grey")};
  border-radius: 50%;

  & svg {
    color: inherit;
    font-size: inherit;
    vertical-align: inherit;
  }
`;

export const EditEventInput = styled.input`
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

export const EditEventDuration = styled.div`
  display: grid;
  grid-template-columns: auto 30px 80px;
`;

export const EditEventSetDuration = styled.input`
  height: 5px;
  appearance: none;
  background-color: ${primary};
  box-shadow: inset 0 3px 10px rgba(0, 0, 0, 0.6);
  margin: 10px 10px 0 5px;
`;

export const EditEventWarning = styled.p`
  font-size: 0.8rem;
  padding-left: 10px;
  margin: 0;
  color: rgba(255, 0, 0, 0.8);
`;
