import styled from "styled-components";

import { primary } from "../../constants/colors";

export const EventBody = styled.div`
  background: ${primary};
  padding: 5px 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;

  svg {
    color: rgba(104, 104, 104, 0.8);
    font-size: 0.7rem;
    vertical-align: middle;
  }
`;

export const EventTaskTitle = styled.div`
  grid-column: span 2;

  a {
    text-decoration: none;
    color: rgba(100, 130, 250, 0.8);
  }
  & svg:nth-child(2) {
    margin-left: 5px;
  }
`;

export const EventDateSpan = styled.span`
  color: rgba(104, 104, 104, 0.8);
  font-size: 0.7rem;
  float: right;
`;

export const EventTitleDurationSection = styled.div`
  grid-column: span 2;
  margin: 0 15% 0 0;
`;

export const EventSpan = styled.span`
  font-size: ${props => (props.small ? "0.7rem" : "inherit")};
`;

export const EventDuration = styled.div`
  font-size: 1.3rem;
  float: right;
  white-space: nowrap;

  span {
    font-size: 1rem;
  }
`;

export const EventUtils = styled.div`
  display: block;

  svg {
    cursor: pointer;
    margin-left: 25px;
  }

  > svg:first-child {
    margin-left: 0px;
    color: rgba(255, 0, 0, 0.4);
  }
`;

export const EventLogCount = styled.span`
  font-size: 0.75rem;
`;

// @media (min-width: 768px) {
//   font-size: 2rem;
//   margin: 0;
// }
