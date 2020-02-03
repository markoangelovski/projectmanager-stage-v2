import styled from "styled-components";

import { primary } from "../../constants/colors";

export const EventBody = styled.div`
  background: ${primary};
  padding: 5px 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  grid-template-rows: 1fr auto;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;

  svg {
    color: rgba(104, 104, 104, 0.8);
    font-size: 0.7rem;
    vertical-align: middle;
  }
`;

export const EventTitle = styled.div`
  grid-column: span 2;

  span {
    margin-left: 5px;
  }
  & svg {
    color: rgba(255, 0, 0, 0.4);
    cursor: pointer;
  }
`;

export const EventSpan = styled.span`
  color: ${props => (props.small ? "rgba(104, 104, 104, 0.8)" : "inherit")};
  font-size: ${props => (props.small ? "0.7rem" : "inherit")};
  margin-left: 5px;
`;

export const EventTask = styled.div`
  grid-column: span 2;

  a {
    text-decoration: none;
    color: rgba(100, 130, 250, 0.8);
  }
  & svg:nth-child(2) {
    margin-left: 5px;
  }
`;

export const EventEdit = styled.div`
  display: block;
`;

export const EventDuration = styled.div`
  grid-row: span 2;
  margin: auto;

  span {
    font-size: 1.3rem;
  }
`;

export const EventBooking = styled.div`
  display: block;
`;

// @media (min-width: 768px) {
//   font-size: 2rem;
//   margin: 0;
// }
