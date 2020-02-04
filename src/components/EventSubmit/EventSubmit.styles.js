import styled from "styled-components";

import { primary } from "../../constants/colors";

export const EventForm = styled.form`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: auto 50px;
  grid-template-rows: auto auto;
  grid-gap: 10px;
  padding: 0 10px;
`;

export const EventTitle = styled.input`
  background-color: ${primary};
  height: 25px;
  border: none;
  margin-left: 5px;
  padding: 0 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

export const EventDuration = styled.div`
  display: grid;
  grid-template-columns: auto 30px 80px;
`;

export const EventSetDuration = styled.input`
  height: 5px;
  appearance: none;
  background-color: ${primary};
  box-shadow: inset 0 3px 10px rgba(0, 0, 0, 0.6);
  margin: 10px 10px 0 5px;
`;

export const EventSubmitButton = styled.div`
  color: ${props => (props.title ? "black" : "grey")};
  grid-row: span 2;
  margin: auto;
  padding: 10px;
  height: 20px;
  width: 20px;
  border: 1px solid ${props => (props.title ? "black" : "grey")};
  border-radius: 50%;
`;

// @media (min-width: 768px) {
//   font-size: 2rem;
//   margin: 0;
// }
